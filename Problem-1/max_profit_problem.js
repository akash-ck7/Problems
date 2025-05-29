function getmaxprofit(n) {
  const buildings = [
    { name: "T", time: 5, rate: 1500 },
    { name: "P", time: 4, rate: 1000 },
    { name: "C", time: 10, rate: 3000 },
  ];

  let maxProfit = 0;
  let bestCombos = [];

  function dfs(currentTime, profit, combo) {
    let updated = false;

    for (let b of buildings) {
      const buildEndTime = currentTime + b.time;
      const operationalTime = n - buildEndTime;
      // ensures that only buildings with positive profit potentieal are to be added
      if (buildEndTime <= n && operationalTime > 0) {
        const gain = b.rate * operationalTime;

        const newCombo = { ...combo };
        newCombo[b.name] = (newCombo[b.name] || 0) + 1;

        dfs(buildEndTime, profit + gain, newCombo);
        updated = true;
      }
    }

    if (!updated) {
      if (profit > maxProfit) {
        maxProfit = profit;
        bestCombos = [combo];
      } else if (profit === maxProfit) {
        bestCombos.push(combo);
      }
    }
  }

  dfs(0, 0, {});

  //formating the comobos
  const formattedCombos = bestCombos.map((combo) => {
    return `T: ${combo.T || 0}, P: ${combo.P || 0}, C: ${combo.C || 0}`;
  });

  return {
    maxEarnings: maxProfit,
    combinations: formattedCombos,
  };
}

// for testing
console.log("Time = 49:", getmaxprofit(49));
console.log("Time = 8:", getmaxprofit(8));
console.log("Time = 13:", getmaxprofit(13));
