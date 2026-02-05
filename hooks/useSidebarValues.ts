'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as yaml from 'js-yaml';

export interface SidebarValues {
  design?: {
    meta?: {
      upper?: { v: string | null };
      wb?: { v: string | null };
      bottom?: { v: string | null };
    };
    waistband?: {
      waist?: { v: number };
      width?: { v: number };
    };
    shirt?: {
      strapless?: { v: boolean };
      length?: { v: number };
      width?: { v: number };
      flare?: { v: number };
    };
    collar?: {
      f_collar?: { v: string };
      b_collar?: { v: string };
      width?: { v: number };
      fc_depth?: { v: number };
      bc_depth?: { v: number };
      fc_angle?: { v: number };
      bc_angle?: { v: number };
      f_bezier_x?: { v: number };
      f_bezier_y?: { v: number };
      b_bezier_x?: { v: number };
      b_bezier_y?: { v: number };
      f_flip_curve?: { v: boolean };
      b_flip_curve?: { v: boolean };
      component?: {
        style?: { v: string | null };
        depth?: { v: number };
        lapel_standing?: { v: boolean };
        hood_depth?: { v: number };
        hood_length?: { v: number };
      };
    };
    sleeve?: {
      sleeveless?: { v: boolean };
      armhole_shape?: { v: string };
      length?: { v: number };
      connecting_width?: { v: number };
      end_width?: { v: number };
      sleeve_angle?: { v: number };
      opening_dir_mix?: { v: number };
      standing_shoulder?: { v: boolean };
      standing_shoulder_len?: { v: number };
      connect_ruffle?: { v: number };
      smoothing_coeff?: { v: number };
      cuff?: {
        type?: { v: string | null };
        top_ruffle?: { v: number };
        cuff_len?: { v: number };
        skirt_fraction?: { v: number };
        skirt_flare?: { v: number };
        skirt_ruffle?: { v: number };
      };
    };
    left?: {
      enable_asym?: { v: boolean };
      shirt?: {
        strapless?: { v: boolean };
        width?: { v: number };
        flare?: { v: number };
      };
      collar?: {
        f_collar?: { v: string };
        b_collar?: { v: string };
        width?: { v: number };
        fc_angle?: { v: number };
        bc_angle?: { v: number };
        f_bezier_x?: { v: number };
        f_bezier_y?: { v: number };
        b_bezier_x?: { v: number };
        b_bezier_y?: { v: number };
        f_flip_curve?: { v: boolean };
        b_flip_curve?: { v: boolean };
      };
      sleeve?: {
        sleeveless?: { v: boolean };
        armhole_shape?: { v: string };
        length?: { v: number };
        connecting_width?: { v: number };
        end_width?: { v: number };
        sleeve_angle?: { v: number };
        opening_dir_mix?: { v: number };
        standing_shoulder?: { v: boolean };
        standing_shoulder_len?: { v: number };
        connect_ruffle?: { v: number };
        smoothing_coeff?: { v: number };
        cuff?: {
          type?: { v: string | null };
          top_ruffle?: { v: number };
          cuff_len?: { v: number };
          skirt_fraction?: { v: number };
          skirt_flare?: { v: number };
          skirt_ruffle?: { v: number };
        };
      };
    };
    skirt?: {
      length?: { v: number };
      rise?: { v: number };
      ruffle?: { v: number };
      bottom_cut?: { v: number };
      flare?: { v: number };
    };
    'flare-skirt'?: {
      length?: { v: number };
      rise?: { v: number };
      suns?: { v: number };
    };
    'skirt-many-panels'?: {
      n_panels?: { v: number };
      panel_curve?: { v: number | string };
    };
    asymm?: {
      front_length?: { v: number };
    };
    cut?: {
      add?: { v: boolean };
      depth?: { v: number };
      width?: { v: number };
      place?: { v: number };
    };
    'godet-skirt'?: {
      base?: { v: string };
      insert_w?: { v: number };
      insert_depth?: { v: number };
      num_inserts?: { v: number };
      cuts_distance?: { v: number };
    };
    'pencil-skirt'?: {
      length?: { v: number };
      rise?: { v: number };
      flare?: { v: number };
      low_angle?: { v: number };
      front_slit?: { v: number };
      back_slit?: { v: number };
      left_slit?: { v: number };
      right_slit?: { v: number };
      style_side_cut?: { v: string | null };
    };
    'levels-skirt'?: {
      base?: { v: string };
      level?: { v: string };
      num_levels?: { v: number };
      level_ruffle?: { v: number };
      length?: { v: number };
      rise?: { v: number };
      base_length_frac?: { v: number };
    };
    pants?: {
      length?: { v: number };
      width?: { v: number };
      flare?: { v: number };
      rise?: { v: number };
      cuff?: {
        type?: { v: string | null };
        top_ruffle?: { v: number };
        cuff_len?: { v: number };
        skirt_fraction?: { v: number };
        skirt_flare?: { v: number };
        skirt_ruffle?: { v: number };
      };
    };
  };
  body?: {
    [key: string]: number;
  };
}

interface UseSidebarValuesOptions {
  /** Path to the YAML file (relative to /samples/ or /assets/samples/) */
  yamlPath?: string;
  /** Debounce delay in milliseconds for API requests (default: 500ms) */
  debounceMs?: number;
}

/**
 * Hook for managing sidebar section values based on YAML files.
 * 
 * Loads a YAML file, parses it to JSON, and provides methods to update values.
 * Automatically sends POST requests to /api/preview when values change (with debouncing).
 * 
 * @example
 * ```tsx
 * const { values, updateShirtValue, updateCollarValue, loading } = useSidebarValues({
 *   yamlPath: '/samples/pencil_skirt/dress_pencil_body_measurements.yaml',
 *   debounceMs: 500
 * });
 * 
 * // Update a shirt value
 * updateShirtValue('length', 1.5);
 * 
 * // Update a nested value
 * updateValue(['design', 'collar', 'component', 'style'], 'Turtle');
 * ```
 */
export function useSidebarValues(options: UseSidebarValuesOptions = {}) {
  const { yamlPath = '/samples/pencil_skirt/dress_pencil_body_measurements.yaml', debounceMs = 500 } = options;
  
  const [values, setValues] = useState<SidebarValues>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load YAML file and parse it
  useEffect(() => {
    async function loadYaml() {
      try {
        setLoading(true);
        setError(null);
        
        // Try public/samples first, then assets/samples
        let response = await fetch(yamlPath.startsWith('/') ? yamlPath : `/samples/${yamlPath}`);
        
        if (!response.ok) {
          // Try assets/samples as fallback
          response = await fetch(`/assets/samples/${yamlPath}`);
        }
        
        if (!response.ok) {
          throw new Error(`Failed to load YAML file: ${response.statusText}`);
        }
        
        const yamlText = await response.text();
        const parsed = yaml.load(yamlText) as SidebarValues;
        
        setValues(parsed);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load YAML file';
        setError(errorMessage);
        console.error('Error loading YAML:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadYaml();
  }, [yamlPath]);

  // Send POST request to /api/preview with debouncing
  const sendPreviewRequest = useCallback((updatedValues: SidebarValues) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const response = await fetch('/api/preview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedValues),
        });

        if (!response.ok) {
          throw new Error(`Preview request failed: ${response.statusText}`);
        }
      } catch (err) {
        console.error('Error sending preview request:', err);
      }
    }, debounceMs);
  }, [debounceMs]);

  // Update a value at a specific path
  const updateValue = useCallback((path: string[], newValue: any) => {
    setValues((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as SidebarValues;
      
      // Navigate to the nested path and update the value
      let current: any = updated;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
      
      // Set the value
      const lastKey = path[path.length - 1];
      if (current[lastKey] && typeof current[lastKey] === 'object' && 'v' in current[lastKey]) {
        current[lastKey].v = newValue;
      } else {
        current[lastKey] = { v: newValue };
      }
      
      // Send preview request
      sendPreviewRequest(updated);
      
      return updated;
    });
  }, [sendPreviewRequest]);

  // Helper functions for common updates
  const updateShirtValue = useCallback((key: string, value: any) => {
    updateValue(['design', 'shirt', key], value);
  }, [updateValue]);

  const updateCollarValue = useCallback((key: string, value: any) => {
    updateValue(['design', 'collar', key], value);
  }, [updateValue]);

  const updateSleeveValue = useCallback((key: string, value: any) => {
    updateValue(['design', 'sleeve', key], value);
  }, [updateValue]);

  const updateSkirtValue = useCallback((key: string, value: any) => {
    updateValue(['design', 'skirt', key], value);
  }, [updateValue]);

  const updatePantsValue = useCallback((key: string, value: any) => {
    updateValue(['design', 'pants', key], value);
  }, [updateValue]);

  const updateSilhouetteValue = useCallback((key: 'upper' | 'wb' | 'bottom', value: string | null) => {
    updateValue(['design', 'meta', key], value);
  }, [updateValue]);

  const updateAsymmetryValue = useCallback((key: string, value: any) => {
    updateValue(['design', 'left', key], value);
  }, [updateValue]);

  // Get value at a specific path
  const getValue = useCallback((path: string[]): any => {
    let current: any = values;
    for (const key of path) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }
    return current && typeof current === 'object' && 'v' in current ? current.v : current;
  }, [values]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    values,
    loading,
    error,
    updateValue,
    updateShirtValue,
    updateCollarValue,
    updateSleeveValue,
    updateSkirtValue,
    updatePantsValue,
    updateSilhouetteValue,
    updateAsymmetryValue,
    getValue,
    // Direct access to common values
    shirt: values.design?.shirt,
    collar: values.design?.collar,
    sleeve: values.design?.sleeve,
    skirt: values.design?.skirt,
    pants: values.design?.pants,
    silhouette: values.design?.meta,
    asymmetry: values.design?.left,
  };
}
