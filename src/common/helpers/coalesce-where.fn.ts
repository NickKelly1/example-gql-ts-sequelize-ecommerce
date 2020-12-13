import { WhereOptions, Op } from "sequelize";

export function coalesceAndWhere<T>(wheres?: null | (undefined | null | WhereOptions<T>)[]): undefined | WhereOptions<T> {
  if (!wheres) return undefined;
  const _wheres = wheres.filter((wh): wh is NonNullable<WhereOptions<T>> => (wh != null));
  if (_wheres.length === 0) return undefined;
  if (_wheres.length === 1) return _wheres[0];
  return { [Op.and]: _wheres, };
}

export function coalesceOrWhere<T>(wheres?: null | (undefined | null | WhereOptions<T>)[]): undefined | WhereOptions<T> {
  if (!wheres) return undefined;
  const _wheres = wheres.filter((wh): wh is NonNullable<WhereOptions<T>> => (wh != null));
  if (_wheres.length === 0) return undefined;
  if (_wheres.length === 1) return _wheres[0];
  return { [Op.and]: _wheres, };
}
