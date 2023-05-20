import React from 'react';
import './App.css';

// Change triggerKey inside of banks
const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 82,
    keyTrigger: 'R',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 73,
    keyTrigger: 'I',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 79,
    keyTrigger: 'O',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 74,
    keyTrigger: 'J',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 75,
    keyTrigger: 'K',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 76,
    keyTrigger: 'L',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 82,
    keyTrigger: 'R',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 73,
    keyTrigger: 'I',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 79,
    keyTrigger: 'O',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 74,
    keyTrigger: 'J',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 75,
    keyTrigger: 'K',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 76,
    keyTrigger: 'L',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

// soundName called to drum-machine
const soundsName = {
  heaterKit: "Heater Kit",
  pianoKit: "Piano Kit"
};

const bankGroup = {
  heaterKit: bankOne,
  pianoKit: bankTwo
}

const KeyboardKey = ({ play, sound: { id, keyTrigger, url, keyCode } }) => {

  const handleKeyPress = (event) => {
    if(event.keyCode === keyCode){
      play(keyTrigger, id)
    }
  }
  
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
  }, [])

// drumpad function
  return (
    <button id={keyCode} className="drum-pad" onClick={() => play(keyTrigger, id)}>
      <audio className="clip" id={keyTrigger} src={url} />
          {keyTrigger}
    </button>
  )
}
// Power button funciton
const Keyboard = ({ power, play, sounds }) => (
  <div className="keyboard">
    {power 
      ? sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)
      : sounds.map((sound) => <KeyboardKey play={play} sound={{...sound, url: "#"}} />)
    }
  </div>
)

 // On/Off Switch, Bank Name Display, Volume
const DomControle = ({ stop, name, power, volume, handleVolumeChange, changeSoundBank }) => (
  <div className="control">
    <button onClick={stop}>Turn Power {power ? "OFF" : "ON"}</button>
    <h2>Volume: %{Math.round(volume * 100)}</h2>
    <input
      max='1'
      min='0'
      step='0.01'
      type='range'
      value={volume}
      onChange={handleVolumeChange}
    />
    <h2 id="display">{name}</h2>
    <button onClick={changeSoundBank}>Change Sound Bank</button>
  </div>
)

function App() {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(bankGroup[soundType])

  const stop = () => {
    setPower(!power)
  }

  const handleVolumeChange = (event) => {
    setVolume(event.target.value)
  }

  // Styles for buttons on click
  const styleActiveKey = (audio) => {
    audio.parentElement.style.backgroundColor = "#000000"
    audio.parentElement.style.color = "#ffffff"
  }

  const deactivateAudio = (audio) => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = "#ffffff"
      audio.parentElement.style.color = "#000000" 
    }, 300)
  }
 
  const play = (keyTrigger, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(keyTrigger)
    styleActiveKey(audio)
    audio.currentTime = 0;
    audio.play()
    deactivateAudio(audio)  
  }

  // Change Sound Bank Switch Function
  const changeSoundBank = () => {
    setSoundName("")
    if(soundType === "heaterKit"){
      setSoundType("pianoKit")
      setSounds(bankGroup.pianoKit)
    } else {
      setSoundType("heaterKit")
      setSounds(bankGroup.heaterKit)
    }
  }

  const setKeyVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.keyTrigger))
    audios.forEach(audio => {
      if(audio){
        audio.volume = volume
      }
    })
  }

  return (
    <div id="drum-machine">
      {setKeyVolume()}
      <div className="wrapper">
        <Keyboard power={power} play={play} sounds={sounds} />
        <DomControle
          stop={stop}
          volume={volume}
          power={power}
          handleVolumeChange={handleVolumeChange} 
          name={soundName || soundsName[soundType]} 
          changeSoundBank={changeSoundBank} />
      </div>
    </div> 
  );
}

export default App;
