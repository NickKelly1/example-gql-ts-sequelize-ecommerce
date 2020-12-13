
export const Can: ICheck = { can: true, reason: null, }
export const Cant = (reason?: string): ICheck => ({ can: false, reason, });
export type ICheck = { can: true, reason?: null; } | { can: false, reason?: null | string; }
