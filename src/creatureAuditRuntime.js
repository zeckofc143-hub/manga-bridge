import { allCatalogCreatures } from './creatureCatalogData';
import { nonCapturableCreatures } from './creatureCatalogExtras';
import { coreAudit } from './creatureAuditCore';
import { specialAudit } from './creatureAuditSpecials';
import { worldAudit } from './creatureAuditWorld';

const audit = { ...coreAudit, ...specialAudit, ...worldAudit };

function applyAudit(target) {
  const patch = audit[target.id];
  if (!patch) return target;

  const originalNotes = Array.isArray(target.battleNotes) ? target.battleNotes : [];
  const auditedNotes = Array.isArray(patch.battleNotes) ? patch.battleNotes : originalNotes;
  const details = Array.isArray(patch.details) ? patch.details : [];

  Object.assign(target, patch, {
    stats: { ...(target.stats || {}), ...(patch.stats || {}) },
    battleNotes: [...details, ...auditedNotes],
    verifiedAt: '2026-09-05'
  });

  return target;
}

allCatalogCreatures.forEach(applyAudit);
nonCapturableCreatures.forEach(applyAudit);

export const auditedCreatureCount = Object.keys(audit).length;
