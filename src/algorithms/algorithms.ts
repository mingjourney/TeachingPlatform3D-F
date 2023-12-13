//1.两数之和
export const twoSum = (nums: number[], target: number): number[] => {
  const m = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]
    if (m.has(need)) {
      return [m.get(need)!, i]
    }
    m.set(nums[i], i)
  }
  return []
}
// 49.字母异位词分组
export const groupAnagrams = (string: string[]): string[][] => {
  const m = new Map<string, string[]>()
  for (const c of string) {
    const strList = [...c]
    const sortedStr = strList.sort().join(',')
    if (m.has(sortedStr)) {
      m.get(sortedStr)!.push(c)
    } else {
      m.set(sortedStr, [c])
    }
  }
  return [...m.values()]
}

// 128.最长连续序列
export const longestConsecutive = (nums: number[]): number => {
  const m = new Set<number>()
  for (const num of nums) {
    if (!m.has(num)) {
      m.add(num)
    }
  }
  let res = 0
  for (let c of m) {
    if (!m.has(c - 1)) {
      let cur = 1
      while (m.has(++c)) {
        cur++
      }
      res = Math.max(cur, res)
    }
  }
  return res
}
// 283.移动零
export const moveZeroes = (nums: number[]): number[] => {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      if (i !== j) {
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
      }
      j++
    }
  }
  return nums
}
// 11.盛最多水的容器
export const maxArea = (nums: Array<number>) => {
  let L = 0,
    R = nums.length - 1
  let res = 0,
    cur = 0
  while (L < R) {
    if (nums[L] < nums[R]) {
      cur = nums[L] * (R - L)
      L++
    } else {
      cur = nums[R] * (R - L)
      R--
    }
    res = Math.max(cur, res)
  }
  return res
}

export const threeSum = (nums: number[]): number[][] => {
  nums.sort((a, b) => a - b)
  const res: number[][] = []
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue
    }
    let L = 0,
      R = nums.length - 1
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (sum === 0) res.push([L, R, i])
      else if (sum < 0) L++
      else R--
    }
  }
  return res
}
