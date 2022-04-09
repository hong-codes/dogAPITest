const BREEDS_URL ='https://dog.ceo/api/breeds/list/all'

const select = document.querySelector('.breeds')

fetch(BREEDS_URL)
  .then(res => {
    return res.json();
  })
  .then(data => {
    const breedsObject = data.message; //Turn the message into an object
    const breedsArray = Object.keys(breedsObject) //Turn the object into an array
    for (let i = 0; i < breedsArray.length; i++){
      const option = document.createElement('option') //<option></option>
      option.value = breedsArray[i] //<option value = 'breed'>
      option.innerText = breedsArray[i] //<option value = 'breed'>breed</option>
      select.appendChild(option) //adds current <option> tag to the select box list of options
    }

  })

  select.addEventListener('change', event => {
    let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`
    getDoggoImg(url);
    doggoInfo.assignMF();
    doggoInfo.assignAge();
    doggoInfo.assignLikes();
    doggoInfo.assignDislikes();
    doggoInfo.assignFunFact();
  })

  const img = document.querySelector('.dog-img')

  const getDoggoImg = url => {
    fetch(url) //going to the API url above 
      .then(res => {
        return res.json() //get JSON message back
      })
      .then(data => {
        img.src = data.message //extract message from JSON and attach to img tag as new source
      })
  }

  const doggoInfo = {
    fNames: ['Abby', 'Addie', 'Alie'],
    mNames: ['Abe', 'Abbott', 'Ace'],
    likesList: ['Ice water from MCD', 'kisses', 'snuggles', 'sniffing the air'],
    dislikesList: ['Eating alone', 'roobmas', 'small children', 'loud noises'],
    factList: ['remembers all the squirrels they have ever seen', 'wishes they knew how cars work', 'wants to fly', 'funny as ever'],
    MF: '',
    rname: '',
    age: '',
    likes: '',
    dislikes: '',
    fact: '',

    assignMF() {
      x = (Math.floor(Math.random() * 2) === 0)
      if(x) {
        this.MF = "Female";
        this.assignName(this.fNames)
        console.log('true result')
      } else {
        this.MF = "Male";
        this.assignName(this.mNames)
      }
      document.getElementById('MF').innerHTML = `S: ${this.MF}`
    },

    assignName(array){
      this.rname = array[Math.floor(Math.random() * array.length)]
      document.getElementById("dog-name").innerHTML = `${this.rname}`
    },

    assignAge() {
      this.age = Math.floor(Math.random() * 16 + 1)
      document.getElementById("age").innerHTML = `Age: ${this.age}`
    },

    yatesShuffle(array) {
      let m = array.length, t, i;
      // while there remain elements to shuffle
      while (m) {
        //pick a remaining element...
        i = Math.floor(Math.random() * m--);
        //And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },

    assignLikes() {
      this.likes = this.yatesShuffle(this.likesList).slice(0,2)
      document.getElementById("likes").innerHTML = `Likes: ${this.likes[0]}, ${this.likes[1]}`
    },


    assignDislikes() {
      this.dislikes = this.yatesShuffle(this.dislikesList).slice(0,2)
      document.getElementById("dislikes").innerHTML = `Dislikes: ${this.dislikes[0]}, ${this.dislikes[1]}`
    },

    assignFunFact() {
      this.fact = this.factList[Math.floor(Math.random() * this.factList.length)]
      document.getElementById("fun-fact").innerHTML = `Additional Info: ${this.fact}`
    }

  }