'use client'
import { createContext, ReactNode, useState, useCallback, useMemo, useRef } from "react";
import * as yaml from 'js-yaml';
import deepmerge from 'deepmerge';
import { SidebarValues, SidebarPatch, mergeSidebarPayload } from '@/hooks/useSidebarValues';
import defautData from '@/assets/samples/default.json'

// Mannequin data types
interface MannequinMeasurements {
  bust: number;
  hips: number;
  waist: number;
  wrist: number;
  head_l: number;
  height: number;
  neck_w: number;
  leg_circ: number;
  bust_line: number;
  hips_line: number;
  underbust: number;
  arm_length: number;
  back_width: number;
  bum_points: number;
  shoulder_w: number;
  waist_line: number;
  bust_points: number;
  armscye_depth: number;
  shoulder_incl: number;
  arm_pose_angle: number;
  hip_back_width: number;
  vert_bust_line: number;
  crotch_hip_diff: number;
  hip_inclination: number;
  waist_back_width: number;
  waist_over_bust_line: number;
}

interface MannequinData {
  id: string;
  user_id: string;  
  name?: string;
  status: string;
  generation_metadata: {
    body_type?: string;
    body: MannequinMeasurements;
  };
  created_at: string;
  body_type: string;
}

interface CanvasContextType {
  patternURL: string | null;
  modelURL: string | null;
  sidebarPatch: SidebarPatch;
  values: SidebarValues;
  loading: boolean;
  error: string | null;
  mannequinData: MannequinData | null;

  setPatternURL: (value: string | null) => void;
  setModelURL: (value: string | null) => void;
  updateValue: (path: string[], value: unknown) => void;
  loadYaml: (yamlPath: string, sessionToken?: string | null, mannequinData?: any | null) => Promise<void>;
  fetchMannequin: (id: string, sessionToken: string) => Promise<void>;
  savePattern: (name: string, sessionToken: string) => Promise<{ status: string; message: string; garment_batch_uuid?: string } | null>;
}

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
}

export function CanvasProvider({ children }: CanvasProviderProps) {
  const [patternURL, setPatternURL] = useState<string | null>(null);
  const [modelURL, setModelURL] = useState<string | null>(null);
  const [sidebarPatch, setSidebarPatch] = useState<SidebarPatch>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mannequinData, setMannequinData] = useState<MannequinData | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const values = useMemo(() => mergeSidebarPayload(sidebarPatch), [sidebarPatch]);

  const sendPreviewRequest = useCallback(async (payload: SidebarValues, sessionToken?: string | null) => {
    if (debounceTimerRef.current) { 
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(async () => {
      try {
        setLoading(true)
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        if (sessionToken) {
          headers['Authorization'] = `Bearer ${sessionToken}`;
        }
        console.debug('canvas data: ', mannequinData)
        // Include mannequin_batch_uid in payload if mannequin data exists
        const requestPayload = {
          ...payload,
          ...(mannequinData?.id && { mannequin_batch_uid: mannequinData.id })
        };
        
        const response = await fetch('/api/preview', {
          method: 'POST',
          headers,
          body: JSON.stringify(requestPayload),
        });

        if (!response.ok) {
          throw new Error(`Preview request failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        if (data.patternURL) {
          setPatternURL(data.patternURL);
          setLoading(false)
        }
      } catch (err) {
        console.error('Error sending preview request:', err);
      }
    }, 500); // Default debounce 500ms
  }, []);

  const updateValue = useCallback((path: string[], value: unknown) => {
    setSidebarPatch((prev) => {
      const next = setPatchAtPath(prev, path, value);
      const merged = mergeSidebarPayload(next);
      
      sendPreviewRequest(merged, 'eyJhbGciOiJFUzI1NiIsImtpZCI6ImJiNGU5MzlhLWMyNWEtNDZmYS1iMTk1LTJkMDRiODA0MjcyYSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2hqdHB6cGFnbmZtdmxhYnBybWJ3LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhZGViMmEzNC03NmU1LTRkYzYtYWZhNy03NTEyZTIzOTAxMzEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcwNDcwNDI3LCJpYXQiOjE3NzA0NjY4MjcsImVtYWlsIjoiYnJpZ29saWJvb25qZWZmZXJzb25AZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJiaXJ0aGRheSI6IjIwMDUtMDMtMDQiLCJlbWFpbCI6ImJyaWdvbGlib29uamVmZmVyc29uQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYm9vbiBKZWZmZXJzb24iLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImFkZWIyYTM0LTc2ZTUtNGRjNi1hZmE3LTc1MTJlMjM5MDEzMSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzY5OTY3MzU5fV0sInNlc3Npb25faWQiOiJhMTIxMTRjOC1iMDgzLTRlODctYmI5ZS1lZDU0NTU2NDUxYTYiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.8biRCdMa5tdQarutI0QCj2CvpJseyeadUyziSGMAlQjiyNR_yKCELTiOfzotviFzbiHQCnHYoWa3qQ6aKCwRMQ');
      return next;
    });
  }, [sendPreviewRequest]);

  const loadYaml = useCallback(async (yamlPath: string, sessionToken?: string | null, mannequinData?: any | null) => {
    try {
      setLoading(true);
      setError(null);

      let response = await fetch(yamlPath.startsWith('/') ? yamlPath : `/samples/${yamlPath}`);
      if (!response.ok) {
        response = await fetch(`/assets/samples/${yamlPath}`);
      }
      if (!response.ok) {
        throw new Error(`Failed to load YAML file: ${response.statusText}`);
      }

      const yamlText = await response.text();
      const parsed = yaml.load(yamlText) as SidebarPatch;
      
      // If mannequinData is provided, merge its measurements into the body section
      if (mannequinData?.generation_metadata?.body) {
        const measurements = mannequinData.generation_metadata.body;
        
        // Create body patch from mannequin measurements
        const bodyPatch: SidebarPatch = {
          body: measurements
        };
        
        // Merge the mannequin measurements with the YAML data
        const mergedPatch = deepmerge(parsed, bodyPatch);
        setSidebarPatch(mergedPatch);
        const merged = mergeSidebarPayload(mergedPatch);
        await sendPreviewRequest(merged, sessionToken);
      } else {
        // No mannequin data, use YAML as-is
        setSidebarPatch(parsed);
        const merged = mergeSidebarPayload(parsed);
        await sendPreviewRequest(merged, sessionToken);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load YAML file';
      setError(errorMessage);
      console.error('Error loading YAML:', err);
    } finally {
      setLoading(false);
    }
  }, [sendPreviewRequest]);

  const fetchMannequin = useCallback(async (id: string, sessionToken: string) => {
    try {
      setLoading(true);
      setError(null);

      console.debug('fetching mannequin from canvas hook')
      const response = await fetch(`/api/mannequin/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch mannequin: ${response.statusText}`);
      }

      const data = await response.json();
      console.debug('Fetched mannequin data:', data);
      
      // The API returns { data: { ... } }, so we need to unwrap it
      if (data?.data) {
        console.debug('setting mannequin data')
        setMannequinData(data.data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch mannequin';
      setError(errorMessage);
      console.error('Error fetching mannequin:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const savePattern = useCallback(async (name: string, sessionToken: string) => {
    try {
      setLoading(true);
      setError(null);

      // Prepare the payload in the format expected by the backend
      // Backend expects: { designs: [{ name: string, design: {...}}], ... }
      const payload = {
        designs: [{ name: name, design: values }],
        ...(mannequinData?.id && { mannequin_batch_uid: mannequinData.id })
      };

      console.debug('Saving pattern with payload:', payload);

      const response = await fetch('/api/pattern', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save pattern: ${errorText}`);
      }

      const data = await response.json();
      console.log('Pattern saved successfully:', data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save pattern';
      setError(errorMessage);
      console.error('Error saving pattern:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [values, mannequinData]);

  return (
    <CanvasContext.Provider value={{
      patternURL,
      modelURL,
      sidebarPatch,
      values,
      loading,
      error,
      mannequinData,
      setPatternURL,
      setModelURL,
      updateValue,
      loadYaml,
      fetchMannequin,
      savePattern
    }}>
      {children}
    </CanvasContext.Provider>
  );
}

// Helper function to set patch at path
function setPatchAtPath(prev: SidebarPatch, path: string[], value: unknown): SidebarPatch {
  if (path.length === 1) {
    return { ...prev, [path[0]]: { v: value } } as SidebarPatch;
  }
  const [key, ...rest] = path;
  const child = (prev as Record<string, unknown>)[key] as SidebarPatch | undefined;
  return { ...prev, [key]: setPatchAtPath(child ?? {}, rest, value) } as SidebarPatch;
}
