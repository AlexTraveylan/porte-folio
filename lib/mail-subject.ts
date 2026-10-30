import type { CalcRushTopic } from "./calc-rush"

export function buildMailSubject(name: string, topic?: CalcRushTopic): string {
  const cleanName = name.replace(/[\r\n]+/g, " ").trim()
  const base = `Nouveau message de ${cleanName}`
  return topic ? `[Calc Rush] ${topic} - ${base}` : base
}
