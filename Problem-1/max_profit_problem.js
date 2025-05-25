function calculateBestEarnings(totalTime) {
  let highestProfit = 0;
  let selectedPlan = { theatres: 0, pubs: 0, parks: 0 };

  // Trying every possible number of commercial parks we can build
  for (let parks = 0; parks <= Math.floor(totalTime / 10); parks++) {
    let tLeftAfterPark = totalTime - parks * 10;

    // Trying every possible number of theatres we can build after parks
    for (
      let theatres = 0;
      theatres <= Math.floor(tLeftAfterPark / 5);
      theatres++
    ) {
      let usedbytheatre = theatres * 5;
      let tLeftAfterTheatre = tLeftAfterPark - usedbytheatre;
      // Trying every number of pub we can squeeze in the remaining period of time

      for (let pubs = 0; pubs <= Math.floor(tLeftAfterTheatre / 4); pubs++) {
        let totalTimeUsed = parks * 10 + theatres * 5 + pubs * 4;
        if (totalTimeUsed > totalTime) {
          continue;
        }
        // Each building will earns money every unit of time * after* it's builts
        let parkIncome = parks * 3000 * (totalTime - parks * 10);
        let theatreIncome =
          theatres * 1500 * (totalTime - parks * 10 - theatres * 5);
        let pubIncome =
          pubs * 1000 * (totalTime - parks * 10 - theatres * 5 - pubs * 4);

        let totalIncome = parkIncome + theatreIncome + pubIncome;

        // we need to save the best combination
        if (totalIncome > highestProfit) {
          highestProfit = totalIncome;
          selectedPlan = {
            theatres: theatres,
            pubs: pubs,
            parks: parks,
          };
        }
      }
    }
  }
  // Printing the output  in a readable format
  console.log(`Time Unit: ${totalTime}`);
  console.log(`Earnings: $${highestProfit}`);
  console.log(
    `Solution: T: ${selectedPlan.theatres}, P: ${selectedPlan.pubs}, C: ${selectedPlan.parks}`
  );
}

// for few example cases
calculateBestEarnings(7); // it Should be $3000
calculateBestEarnings(8); // it Should be $4500
calculateBestEarnings(13); //it  Should be $16500
