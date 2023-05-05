const { createApp, ref, computed, watch } = Vue;

const generaterandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const myApp = createApp({
  setup() {
    const playerHealth = ref(100);

    const enemyHealth = ref(100);

    const round = ref(0);

    const winner = ref(null);

    const logMessages = ref([]);

    const addLogMessage = (who, what, value)=>{
        logMessages.value.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        })
    }

    const attackPlayer = () => {
      const attackValue = generaterandomValue(8, 15);
      if(playerHealth.value - attackValue <=0){
        playerHealth.value = 0;
      }else {
        playerHealth.value -= attackValue;
      }
      addLogMessage('enemy','attack','attackValue');
    };

    const attackEnemy = () => {
      round.value++;
      const attackValue = generaterandomValue(5, 12);
      if (enemyHealth.value - attackValue <= 0) {
        enemyHealth.value = 0;
      } else {
        enemyHealth.value -= attackValue;
      }
      addLogMessage('player','attack','attackValue');
      attackPlayer();
    };

    const attackEnemySpeciale = () => {
      round.value++;
      const attackValueSpeciale = generaterandomValue(10, 25);
      enemyHealth.value -= attackValueSpeciale;
      if (enemyHealth.value - attackValue <= 0) {
        enemyHealth.value = 0;
      } else {
        enemyHealth.value -= attackValue;
      }
      addLogMessage('player', 'attack','attackValue');
      attackPlayer();
    };

    const medikit = () => {
      round.value++;
      const medikitValue = generaterandomValue(10, 25);
      if (playerHealth.value + medikitValue > 100) {
        playerHealth.value = 100;
      } else {
        playerHealth.value += medikitValue;
      }
      addLogMessage('player', 'medikit','medikitValue');
      attackPlayer();
    };

    const gameover = () => {
      winner.value = "enemy";
      playerHealth.value = 0;
    };

    const playerBarStyles = computed(() => {
      return { width: playerHealth.value + "%" };
    });
    const enemyBarStyles = computed(() => {
      return { width: enemyHealth.value + "%" };
    });
    const attackEnemyDisabled = computed(() => {
      return round.value % 3 !== 0;
    });
    const medikitDisabled = computed(() => {
      return playerHealth.value >= 50 || round.value % 3 !== 0;
    });

    watch(enemyHealth, (enemyHealth, prevenEmyHealth) => {
      if (enemyHealth <= 0 && playerHealth <= 0) {
        winner.value = "draw";
      } else if (enemyHealth <= 0) {
        winner.value = "player";
      }
    });
    watch(playerHealth, (playerHealth, prevePlayerHealth) => {
      if (playerHealth <= 0 && enemyHealth <= 0) {
        winner.value = "draw";
      } else if (playerHealth <= 0) {
        winner.value = "enemy";
      }
    });

  

    return {
      attackEnemy,
      attackEnemySpeciale,
      gameover,
      medikit,
      playerHealth,
      enemyHealth,
      round,
      playerBarStyles,
      enemyBarStyles,
      attackEnemyDisabled,
      medikitDisabled,
      winner,
      logMessages,
      addLogMessage
    };
  },
});

myApp.mount("#game");
