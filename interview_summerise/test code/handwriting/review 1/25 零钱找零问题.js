// 题目描述:给定不同面额的硬币 coins 和一个总金额 amount。
// 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
// 如果没有任何一种硬币组合能组成总金额，返回 -1s
// 输入: coins = [1, 2, 5], amount = 11
// 输出: 3
// 解释: 11 = 5 + 5 + 1


// 输入: (coins = [2]), (amount = 3);
// 输出: -1;

function CoinProblem(coins, amount) {
  const dp = [0]

  for(let i = 1; i <= amount; i++) {
    dp[i] = Infinity
    for(j = 0; j < coins.length; j++) {
      if(coins[j] <= i) {
        dp[i] = Math.min(dp[i - coins[j]] + 1 , dp[i])
      }
    }
  }
  if(dp[amount]!=Infinity)
    return dp[amount]
  return -1
}

console.log(CoinProblem([1, 2, 5], 11))
console.log(CoinProblem([2], 11))