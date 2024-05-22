
export const generateUniqueId = (name: string) => {
  return name + Math.random().toString(36);
}