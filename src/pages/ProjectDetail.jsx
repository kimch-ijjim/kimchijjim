import { useParams, Navigate } from "react-router-dom";
import React, { Suspense, lazy, useMemo } from "react";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const meta = useMemo(() => projects.find(p => p.id === projectId), [projectId]);
  if (!meta) return <Navigate to="/not-found" replace />;

  const LazyComp = lazy(meta.component);

  return (
    <Suspense fallback={<div style={{ padding: 32 }}>Loading…</div>}>
      <LazyComp />
    </Suspense>
  );
}
