'use client';

import { useEffect, useCallback } from 'react';
import deepmerge from 'deepmerge';
import { useCanvas } from '@/hooks/useCanvas';
import { useAuth } from '@/components/AuthProvider';
/** Recursive partial: every key optional, nested objects also partial. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface SidebarValues {
  design: {
    meta: {
      upper: { v: string | null };
      wb: { v: string | null };
      bottom: { v: string | null };
    };
    waistband: {
      waist: { v: number };
      width: { v: number };
    };
    shirt: {
      strapless: { v: boolean };
      length: { v: number };
      width: { v: number };
      flare: { v: number };
    };
    collar: {
      f_collar: { v: string };
      b_collar: { v: string };
      width: { v: number };
      fc_depth: { v: number };
      bc_depth: { v: number };
      fc_angle: { v: number };
      bc_angle: { v: number };
      f_bezier_x: { v: number };
      f_bezier_y: { v: number };
      b_bezier_x: { v: number };
      b_bezier_y: { v: number };
      f_flip_curve: { v: boolean };
      b_flip_curve: { v: boolean };
      component: {
        style: { v: string | null };
        depth: { v: number };
        lapel_standing: { v: boolean };
        hood_depth: { v: number };
        hood_length: { v: number };
      };
    };
    sleeve: {
      sleeveless: { v: boolean };
      armhole_shape: { v: string };
      length: { v: number };
      connecting_width: { v: number };
      end_width: { v: number };
      sleeve_angle: { v: number };
      opening_dir_mix: { v: number };
      standing_shoulder: { v: boolean };
      standing_shoulder_len: { v: number };
      connect_ruffle: { v: number };
      smoothing_coeff: { v: number };
      cuff: {
        type: { v: string | null };
        top_ruffle: { v: number };
        cuff_len: { v: number };
        skirt_fraction: { v: number };
        skirt_flare: { v: number };
        skirt_ruffle: { v: number };
      };
    };
    left: {
      enable_asym: { v: boolean };
      shirt: {
        strapless: { v: boolean };
        width: { v: number };
        flare: { v: number };
      };
      collar: {
        f_collar: { v: string };
        b_collar: { v: string };
        width: { v: number };
        fc_angle: { v: number };
        bc_angle: { v: number };
        f_bezier_x: { v: number };
        f_bezier_y: { v: number };
        b_bezier_x: { v: number };
        b_bezier_y: { v: number };
        f_flip_curve: { v: boolean };
        b_flip_curve: { v: boolean };
      };
      sleeve: {
        sleeveless: { v: boolean };
        armhole_shape: { v: string };
        length: { v: number };
        connecting_width: { v: number };
        end_width: { v: number };
        sleeve_angle: { v: number };
        opening_dir_mix: { v: number };
        standing_shoulder: { v: boolean };
        standing_shoulder_len: { v: number };
        connect_ruffle: { v: number };
        smoothing_coeff: { v: number };
        cuff: {
          type: { v: string | null };
          top_ruffle: { v: number };
          cuff_len: { v: number };
          skirt_fraction: { v: number };
          skirt_flare: { v: number };
          skirt_ruffle: { v: number };
        };
      };
    };
    skirt: {
      length: { v: number };
      rise: { v: number };
      ruffle: { v: number };
      bottom_cut: { v: number };
      flare: { v: number };
    };
    'flare-skirt': {
      length: { v: number };
      rise: { v: number };
      suns: { v: number };
    };
    'skirt-many-panels': {
      n_panels: { v: number };
      panel_curve: { v: number | string };
    };
    asymm: {
      front_length: { v: number };
    };
    cut: {
      add: { v: boolean };
      depth: { v: number };
      width: { v: number };
      place: { v: number };
    };
    'godet-skirt': {
      base: { v: string };
      insert_w: { v: number };
      insert_depth: { v: number };
      num_inserts: { v: number };
      cuts_distance: { v: number };
    };
    'pencil-skirt': {
      length: { v: number };
      rise: { v: number };
      flare: { v: number };
      low_angle: { v: number };
      front_slit: { v: number };
      back_slit: { v: number };
      left_slit: { v: number };
      right_slit: { v: number };
      style_side_cut: { v: string | null };
    };
    'levels-skirt': {
      base: { v: string };
      level: { v: string };
      num_levels: { v: number };
      level_ruffle: { v: number };
      length: { v: number };
      rise: { v: number };
      base_length_frac: { v: number };
    };
    pants: {
      length: { v: number };
      width: { v: number };
      flare: { v: number };
      rise: { v: number };
      cuff: {
        type: { v: string | null };
        top_ruffle: { v: number };
        cuff_len: { v: number };
        skirt_fraction: { v: number };
        skirt_flare: { v: number };
        skirt_ruffle: { v: number };
      };
    };
  };
  body: {
    [key: string]: number;
  };
}

/** UI state stores only a patch (partial). Merged with DEFAULT only when sending or previewing. */
export type SidebarPatch = DeepPartial<SidebarValues>;

/** One canonical default (runtime truth). Interfaces don't exist at runtime. */
export const DEFAULT_SIDEBAR_VALUES: SidebarValues = {
  design: {
    meta: {
      upper: { v: "Shirt" },
      wb: { v: null },
      bottom: { v: null },
    },
    waistband: {
      waist: { v: 1.0 },
      width: { v: 0.2 },
    },
    shirt: {
      strapless: { v: false },
      length: { v: 1.2 },
      width: { v: 1.05 },
      flare: { v: 1.0 },
    },
    collar: {
      f_collar: { v: "CircleNeckHalf" },
      b_collar: { v: "CircleNeckHalf" },
      width: { v: 0.2 },
      fc_depth: { v: 0.4 },
      bc_depth: { v: 0 },
      fc_angle: { v: 95 },
      bc_angle: { v: 95 },
      f_bezier_x: { v: 0.3 },
      f_bezier_y: { v: 0.55 },
      b_bezier_x: { v: 0.15 },
      b_bezier_y: { v: 0.1 },
      f_flip_curve: { v: false },
      b_flip_curve: { v: false },
      component: {
        style: { v: null },
        depth: { v: 7 },
        lapel_standing: { v: false },
        hood_depth: { v: 1 },
        hood_length: { v: 1 },
      },
    },
    sleeve: {
      sleeveless: { v: false },
      armhole_shape: { v: "ArmholeCurve" },
      length: { v: 0.3 },
      connecting_width: { v: 0.2 },
      end_width: { v: 1.0 },
      sleeve_angle: { v: 10 },
      opening_dir_mix: { v: 0.1 },
      standing_shoulder: { v: false },
      standing_shoulder_len: { v: 5.0 },
      connect_ruffle: { v: 1 },
      smoothing_coeff: { v: 0.25 },
      cuff: {
        type: { v: null },
        top_ruffle: { v: 1 },
        cuff_len: { v: 0.1 },
        skirt_fraction: { v: 0.5 },
        skirt_flare: { v: 1.2 },
        skirt_ruffle: { v: 1.0 },
      },
    },
    left: {
      enable_asym: { v: false },
      shirt: {
        strapless: { v: false },
        width: { v: 1.0 },
        flare: { v: 1.0 },
      },
      collar: {
        f_collar: { v: "CircleNeckHalf" },
        b_collar: { v: "CircleNeckHalf" },
        width: { v: 0.5 },
        fc_angle: { v: 95 },
        bc_angle: { v: 95 },
        f_bezier_x: { v: 0.5 },
        f_bezier_y: { v: 0.3 },
        b_bezier_x: { v: 0.5 },
        b_bezier_y: { v: 0.3 },
        f_flip_curve: { v: false },
        b_flip_curve: { v: false },
      },
      sleeve: {
        sleeveless: { v: true },
        armhole_shape: { v: "ArmholeCurve" },
        length: { v: 0.3 },
        connecting_width: { v: 0.2 },
        end_width: { v: 1.0 },
        sleeve_angle: { v: 10 },
        opening_dir_mix: { v: 0.2 },
        standing_shoulder: { v: false },
        standing_shoulder_len: { v: 5.0 },
        connect_ruffle: { v: 1 },
        smoothing_coeff: { v: 0.25 },
        cuff: {
          type: { v: null },
          top_ruffle: { v: 1 },
          cuff_len: { v: 0.1 },
          skirt_fraction: { v: 0.5 },
          skirt_flare: { v: 1.2 },
          skirt_ruffle: { v: 1.0 },
        },
      },
    },
    skirt: {
      length: { v: 0.2 },
      rise: { v: 1 },
      ruffle: { v: 1.3 },
      bottom_cut: { v: 0 },
      flare: { v: 0 },
    },
    'flare-skirt': {
      length: { v: 0.2 },
      rise: { v: 1 },
      suns: { v: 0.75 },
    },
    'skirt-many-panels': {
      n_panels: { v: 4 },
      panel_curve: { v: 0 },
    },
    asymm: {
      front_length: { v: 0.5 },
    },
    cut: {
      add: { v: false },
      depth: { v: 0.5 },
      width: { v: 0.1 },
      place: { v: -0.5 },
    },
    'godet-skirt': {
      base: { v: "PencilSkirt" },
      insert_w: { v: 15 },
      insert_depth: { v: 20 },
      num_inserts: { v: 4 },
      cuts_distance: { v: 5 },
    },
    'pencil-skirt': {
      length: { v: 0.4 },
      rise: { v: 1 },
      flare: { v: 1.0 },
      low_angle: { v: 0 },
      front_slit: { v: 0 },
      back_slit: { v: 0 },
      left_slit: { v: 0 },
      right_slit: { v: 0 },
      style_side_cut: { v: null },
    },
    'levels-skirt': {
      base: { v: "PencilSkirt" },
      level: { v: "Skirt2" },
      num_levels: { v: 1 },
      level_ruffle: { v: 1.0 },
      length: { v: 0.5 },
      rise: { v: 1 },
      base_length_frac: { v: 0.5 },
    },
    pants: {
      length: { v: 0.3 },
      width: { v: 1.0 },
      flare: { v: 1.0 },
      rise: { v: 1.0 },
      cuff: {
        type: { v: null },
        top_ruffle: { v: 1.0 },
        cuff_len: { v: 0.1 },
        skirt_fraction: { v: 0.5 },
        skirt_flare: { v: 1.2 },
        skirt_ruffle: { v: 1.0 },
      },
    },
  },
  body: {},
};

/** Merge default + patch for sending or previewing. */
export function mergeSidebarPayload(patch: SidebarPatch): SidebarValues {
  return deepmerge(DEFAULT_SIDEBAR_VALUES, patch as object) as SidebarValues;
}

interface UseSidebarValuesOptions {
  /** Path to the YAML file (relative to /samples/ or /assets/samples/) */
  yamlPath: string;
  /** Debounce delay in milliseconds for API requests (default: 500ms) - Note: Now handled in provider */
  debounceMs?: number;
  /** Optional session token for /api/preview Authorization header */
  sessionToken?: string | null;
  /** Mannequin data containing body measurements to merge into the YAML */
  mannequinData?: any;
}

/**
 * Hook for managing sidebar section values based on YAML files.
 * 
 * Loads a YAML file via the provider, and provides methods to update values.
 * Updates trigger preview requests through the provider.
 * 
 * @example
 * ```tsx
 * const { values, updateShirtValue, updateCollarValue, loading } = useSidebarValues({
 *   yamlPath: '/samples/pencil_skirt/dress_pencil_body_measurements.yaml',
 *   debounceMs: 500 // Ignored, uses provider's debounce
 * });
 * 
 * // Update a shirt value
 * updateShirtValue('length', 1.5);
 * 
 * // Update a nested value
 * updateValue(['design', 'collar', 'component', 'style'], 'Turtle');
 * ```
 */
export function useSidebarValues(options: UseSidebarValuesOptions = {
  yamlPath: '',
  debounceMs: 500,
}) {
  const {
    yamlPath = '/samples/pencil_skirt/dress_pencil_body_measurements.yaml',
    sessionToken = null,
    mannequinData = null,
  } = options;

  const { values, updateValue, loadYaml, loading, error, mannequinData: canvasMannequinData } = useCanvas();
  const { token: authToken } = useAuth();

  // Use auth token if no sessionToken provided
  const effectiveToken = sessionToken || authToken;

  // Use mannequinData from props or from canvas context
  const effectiveMannequinData = mannequinData || canvasMannequinData;

  // Load YAML on mount or when mannequinData changes
  useEffect(() => {
    loadYaml(yamlPath, effectiveToken, effectiveMannequinData);
  }, [yamlPath, effectiveToken, effectiveMannequinData, loadYaml]);

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
