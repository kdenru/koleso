const prizes = [
      {
            text: "Купон на 2000 рублей",
            color: "#2E8B57",
            color_text: "#fff",
            id: 0
      },
      {
            text: "Фотокартина в подарок",
            color: "#228B22",
            color_text: "#fff",
            id: 1
      },
      {
            text: "Скидка 30% и бесплатная доставка",
            color: "#008000",
            color_text: "#fff",
            id: 2
      },
      {
            text: "Покрытие итальянским лаком в подарок",
            color: "#006400",
            color_text: "#fff",
            id: 3
      },
      {
            text: "Подарочная упаковка бесплатно",
            color: "#3CB371",
            color_text: "#fff",
            id: 4
      },
];

const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = document.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
const form_control = wheel.querySelector(".form_control")

const prizeSlice = 360 / prizes.length;
const prizeOffset = Math.floor(180 / prizes.length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);

let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;

const createPrizeNodes = () => {
      prizes.forEach(({
                            text,
                            color,
                            color_text,
                            reaction
                      }, i) => {
            const rotation = ((prizeSlice * i) * -1) - prizeOffset;
            spinner.insertAdjacentHTML("beforeend", `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg; color: ${color_text}"><span class="text">${text}</span></li>`);
      });
};

const createConicGradient=()=> {
      spinner.setAttribute("style",`background: conic-gradient(from -90deg, ${prizes.map(({color},i)=>`${color} 0 ${(100/prizes.length)*(prizes.length-i)}%`).reverse()});`);
};

const setupWheel = () => {
      createConicGradient();
      createPrizeNodes();
      prizeNodes = wheel.querySelectorAll(".prize");
};

const spinertia = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return 1
};

const runTickerAnimation = () => {
      const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
      const a = values[0];
      const b = values[1];
      let rad = Math.atan2(b, a);
      if (rad < 0) rad += (2 * Math.PI);
      const angle = Math.round(rad * (180 / Math.PI));
      const slice = Math.floor(angle / prizeSlice);
      if (currentSlice !== slice) {
            ticker.style.animation = "none";
            setTimeout(() => ticker.style.animation = null, 10);
            currentSlice = slice;
      }
      tickerAnim = requestAnimationFrame(runTickerAnimation);
};

const selectPrize = () => {
      const selected = Math.floor(rotation / prizeSlice);
      prizeNodes[selected].classList.add(selectedClass);
      const list = document.getElementById("test")
      prizes.forEach((item) => {
            if (item.id === selected) {
                  console.log()
                  list.innerHTML = item.text
            }
      })
};
trigger.addEventListener("click", () => {
      trigger.disabled = true;
      let a = [{
            id: 0,
            int: 0,
            name: 'Купон на 2000 рублей',
            number: 0
      }, {
            id: 1,
            int: 90,
            name: 'Фотокартина в подарок',
            number: Math.floor(Math.random() * (140 - 75 + 1) + 75)
      }, {
            id: 2,
            int: 0,
            name: 'Скидка 30% и бесплатная доставка',
            number: 0
      }, {
            id: 3,
            int: 0,
            name: 'Покрытие итальянским лаком в подарок',
            number: 0
      }, {
            id: 4,
            int: 0,
            name: 'Подарочная упаковка бесплатно',
            number: 0
      }, ];
      let sum = 0;
      for (let i = 0; i < a.length; i++) {
            sum += a[i].int;
      }
      let rand = Math.floor(Math.random() * sum);
      let i = 0;
      for (let s = a[0].int; s <= rand; s += a[i].int) {
            i++;
      }

      rotation = Math.floor(30 * 360 + a[i].number);
      prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
      wheel.classList.add(spinClass);
      spinner.style.setProperty("--rotate", rotation);
      ticker.style.animation = "none";
      runTickerAnimation();
});
spinner.addEventListener("transitionend", () => {
      cancelAnimationFrame(tickerAnim);
      rotation %= 360;
      selectPrize();
      wheel.classList.remove(spinClass);
      spinner.style.setProperty("--rotate", rotation);
      document.querySelector(".introduction").style = 'display: none'
      document.querySelector(".form_control").style = 'display: block'
      document.querySelector(".btn-spin").style = 'display: none'
});
setupWheel();