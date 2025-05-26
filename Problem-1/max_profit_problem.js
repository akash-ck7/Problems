// Recursive DFS with backtracking approach

function getmaxprofit(n) {
  const buildings = [
    { name: "T", time: 5, rate: 1500 },
    { name: "P", time: 4, rate: 1000 },
    { name: "C", time: 10, rate: 3000 },
  ];

  let maxProfit = 0;
  let bestCombo = { T: 0, P: 0, C: 0 };
  // passing the inputs
  function dfs(currentTime, profit, combo) {
    let updated = false;

    for (let b of buildings) {
      if (currentTime + b.time <= n) {
        const nextTime = currentTime + b.time;
        const operationalTime = n - nextTime;
        const gain = b.rate * operationalTime;

        const newCombo = { ...combo };
        newCombo[b.name] = (newCombo[b.name] || 0) + 1;

        dfs(nextTime, profit + gain, newCombo);
        updated = true;
      }
    }

    if (!updated) {
      if (profit > maxProfit) {
        maxProfit = profit;
        bestCombo = combo;
      }
    }
  }

  dfs(0, 0, { T: 0, P: 0, C: 0 });
  //return the combos here
  return {
    combo: `T: ${bestCombo.T} P: ${bestCombo.P} C: ${bestCombo.C}`,
    profit: `$${maxProfit}`,
  };
}

// Test Cases for all three metioned in the documents
console.log("time = 7 :", getmaxprofit(7)); // ans:$3000
console.log("time = 8 :", getmaxprofit(8)); // ans: $4500
console.log("time = 13 :", getmaxprofit(13)); // ans: $16500
