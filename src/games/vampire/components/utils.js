export const generateId = () => Math.random().toString(36).substr(2, 9);

export const calculateDiff = (oldP, newP) => {
  const changes = [];
  if (!oldP) return ["Nació el vampiro."];

  if (newP.memories.length > oldP.memories.length) changes.push("Creó un nuevo recuerdo.");

  newP.memories.forEach(m => {
    const oldM = oldP.memories.find(om => om.id === m.id);
    if (oldM) {
      if (m.experiences.length > oldM.experiences.length) {
        changes.push(`Añadió vivencia: "${m.experiences[m.experiences.length-1].substring(0, 30)}..."`);
      }
      if (m.isDiary && !oldM.isDiary) changes.push("Movió un recuerdo al diario.");
      if (m.isForgotten && !oldM.isForgotten) changes.push("Olvidó un recuerdo para siempre.");
    }
  });

  newP.skills.forEach(s => {
    const oldS = oldP.skills.find(os => os.id === s.id);
    if (!oldS) changes.push(`Adquirió talento: ${s.name}`);
    else {
      if (s.isChecked && !oldS.isChecked) changes.push(`Usó talento: ${s.name}`);
      if (s.isLost && !oldS.isLost) changes.push(`Perdió talento: ${s.name}`);
      if (!s.isLost && oldS.isLost) changes.push(`Recuperó talento: ${s.name}`);
    }
  });

  newP.resources.forEach(r => {
    const oldR = oldP.resources.find(or => or.id === r.id);
    if (!oldR) changes.push(`Obtuvo recurso: ${r.name}`);
    else if (r.isLost && !oldR.isLost) changes.push(`Perdió recurso: ${r.name}`);
  });

  newP.characters.forEach(c => {
    const oldC = oldP.characters.find(oc => oc.id === c.id);
    if (!oldC) changes.push(`Conoció a: ${c.name} (${c.isImmortal ? 'Inmortal' : 'Mortal'})`);
    else {
      if (c.isDead && !oldC.isDead) changes.push(`Murió: ${c.name}`);
      if (!c.isDead && oldC.isDead) changes.push(`Revivió: ${c.name}`);
      if (c.isImmortal && !oldC.isImmortal) changes.push(`${c.name} se volvió Inmortal.`);
      if (!c.isImmortal && oldC.isImmortal) changes.push(`${c.name} perdió la inmortalidad.`);
      if (c.desc !== oldC.desc) changes.push(`Actualizó a ${c.name}: "${c.desc}"`);
    }
  });

  if (newP.mark !== oldP.mark) changes.push(`Su marca cambió: "${newP.mark}"`);
  return changes;
};
