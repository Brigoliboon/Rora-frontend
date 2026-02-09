'use client'
import { createContext, ReactNode, useState, useCallback, useMemo, useRef } from "react";
import * as yaml from 'js-yaml';
import deepmerge from 'deepmerge';
import { SidebarValues, SidebarPatch, mergeSidebarPayload } from '@/hooks/useSidebarValues';
import defautData from '@/assets/samples/default.json'
interface CanvasContextType {
  patternURL: string | null;
  modelURL: string | null;
  sidebarPatch: SidebarPatch;
  values: SidebarValues;
  loading: boolean;
  error: string | null;

  setPatternURL: (value: string | null) => void;
  setModelURL: (value: string | null) => void;
  updateValue: (path: string[], value: unknown) => void;
  loadYaml: (yamlPath: string, sessionToken?: string | null) => Promise<void>;
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
        const response = await fetch('/api/preview', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
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

  const loadYaml = useCallback(async (yamlPath: string, sessionToken?: string | null) => {
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
      setSidebarPatch(parsed);
      const merged = mergeSidebarPayload(parsed);
      await sendPreviewRequest(merged, sessionToken);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load YAML file';
      setError(errorMessage);
      console.error('Error loading YAML:', err);
    } finally {
      setLoading(false);
    }
  }, [sendPreviewRequest]);

  return (
    <CanvasContext.Provider value={{
      patternURL,
      modelURL,
      sidebarPatch,
      values,
      loading,
      error,
      setPatternURL,
      setModelURL,
      updateValue,
      loadYaml
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
