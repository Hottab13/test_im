export type FiledValidatoeType = (
  value: string,
  allValues: string | undefined
) => string | undefined;
export const requiredField: FiledValidatoeType = (value) => {
  if (value) return undefined;
  return "Произошла ошибка. Поле должно быть заполнено";
};
export const maxLengthCreator = (maxLenght: number): FiledValidatoeType => (
  value
) => {
  if (value.length > maxLenght)
    return `Максимальное количество символов ${maxLenght}!`;
  return undefined;
};
export const matchPass: FiledValidatoeType = (value, allValues) => {
  //@ts-ignore
  if (value !== allValues.pass) return `Пароли не совпадают`;
  return undefined;
};
