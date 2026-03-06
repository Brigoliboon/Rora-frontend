'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { RequestMannequin, RequestPattern } from '@/lib/models/fetchdata/FetchData';
import { RequestType } from '@/lib/models/fetchdata/type';
import { useCanvas } from '@/hooks/useCanvas';
import CanvasEditor from '@/components/canvas/CanvasEditor';
import { useSearchParams } from 'next/navigation';

export default function CanvasPage() {
  const searchParams = useSearchParams();
  const measurementID = searchParams.get('measurement');
  const mannequinUID = searchParams.get('mannequin');
  console.log('measurement: ' + measurementID)
  console.log('mannequin: ' + mannequinUID)
  const { user, token } = useAuth();
  const { patternURL, loading, setPatternURL, fetchMannequin, mannequinData } = useCanvas();
  const [isLoading, setLoading] = useState(true);
  const [defaultMannequin, setDefaultMannequin] = useState({ config_path: '', model_path: '' });

  useEffect(() => {
    if (!token) return;

    async function fetchPattern() {
      if (!token) return;
      try {
        const blob = await new RequestPattern(RequestType.FRONT).getDefaultBlob(token);
        const url = URL.createObjectURL(blob);
        setPatternURL(url);
      } catch (error) {
        console.error('Failed to fetch default pattern:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPattern();
  }, [user, token, setPatternURL]);


  useEffect(() => {
    if (!token) return;
    async function GetMannequin() {
      if (!token) return;

        try {
            if (measurementID){
              await fetchMannequin(measurementID, token);
            }
        } catch (error) {
          console.error('Failed to fetch mannequin data:', error);
        }
    }
    GetMannequin();
  }, [user, token, fetchMannequin]);

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--foreground-muted)]">Loading canvas...</p>
        </div>
      </div>
    );
  }

  return (
    <CanvasEditor
      patternURL={patternURL}
      modelPath={defaultMannequin.model_path}
      loading={loading}
      token={token}
      isMeasurementsEnabled={true}
      is3DEnabled={true}
      isEditable={true}
      mannequinData={mannequinData}
      onRender={() => console.log('Render Pattern')}
      onSave={() => console.log('Save Pattern')}
    />
  );
}
