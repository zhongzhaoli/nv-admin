// 取出字串中的數字
export const extractNumber = (str: string): number => {
  const match = str.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
};
