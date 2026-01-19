import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Jessyca.module.css';
import Image from 'next/image';

const memories = [
  // These points are arranged to form the letter "J" when connected in order
  {
    image: '/j1.jpg', // Corrected path
    text: 'Só quero falar que te amo de uma forma diferente, às vezes não é muito fácil!',
    position: { top: '30%', left: '60%' } // Top of the "J"
  },
  {
    image: '/j2.jpg', // Corrected path
    text: 'Espero que goste, é simples, mas é uma maneira verdadeira que encontrei',
    position: { top: '70%', left: '60%' } // Bottom of the "J" stem
  },
  {
    image: '/j3.jpg', // Corrected path
    text: 'Minha foto favorita sua',
    position: { top: '70%', left: '40%' } // Hook of the "J"
  }
];

export default function JessycaPage() {
  const [modal, setModal] = useState(null);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [clickedMemories, setClickedMemories] = useState(new Set());
  const [linePoints, setLinePoints] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  const skyRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }, () => { // Reduced star count
      const depth = Math.random();
      return {
        size: (1 - depth) * 3 + 1, // Closer stars are bigger
        depth: depth,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        transform: `translateZ(${depth * -500}px)` // Position in 3D space
      }
    });
    setStars(generatedStars);
  }, []);

  // Combined mouse and device orientation effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!skyRef.current) return;
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = skyRef.current;
      const x = (clientX - offsetWidth / 2) / (offsetWidth / 2);
      const y = (clientY - offsetHeight / 2) / (offsetHeight / 2);
      const rotateY = -x * 10;
      const rotateX = y * 10;
      skyRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handleOrientation = (e) => {
      if (!skyRef.current) return;
      const { beta, gamma } = e; // beta: X axis, gamma: Y axis
      const clampedGamma = Math.max(-45, Math.min(45, gamma));
      const clampedBeta = Math.max(-45, Math.min(45, beta));
      const rotateY = clampedGamma / 2;
      const rotateX = (clampedBeta - 45) / 2; // Adjust for typical holding position
      skyRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handlePermission = () => {
      DeviceOrientationEvent.requestPermission().then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setShowPermissionButton(false);
        }
      });
    };

    // Check for iOS 13+ permission requirement
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      setShowPermissionButton(true);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newShootingStar = {
        key: Date.now(),
        top: `${Math.random() * 100}%`,
        left: `-150px`,
        transform: `rotate(${Math.random() * 40 - 20}deg)`,
        animationDuration: `${Math.random() * 2 + 2}s`
      };
      setShootingStars(prev => [...prev, newShootingStar]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleAnimationEnd = (key) => {
    setShootingStars(prev => prev.filter(star => star.key !== key));
  };

  const handleHeartAnimationEnd = (id) => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
  };

  const openModal = (memory, index) => {
    setModal(memory);

    if (!audioPlayed) {
      audioRef.current.play().catch(error => console.error("Audio autoplay failed:", error));
      setAudioPlayed(true);
    }

    setClickedMemories(prevClicked => {
      const newClicked = new Set(prevClicked).add(index);
      if (newClicked.size === memories.length) {
        setTimeout(() => {
          setModal(null); // Close the modal before showing the surprise
          setShowSurprise(true);
        }, 2000);
      }
      return newClicked;
    });

    setLinePoints(prevPoints => {
      const newPoint = memory.position;
      const lastPoint = prevPoints[prevPoints.length - 1];
      if (!lastPoint || lastPoint.top !== newPoint.top || lastPoint.left !== newPoint.left) {
        return [...prevPoints, newPoint];
      }
      return prevPoints;
    });

    // Generate hearts
    const starTop = parseFloat(memory.position.top);
    const starLeft = parseFloat(memory.position.left);
    const newHearts = Array.from({ length: Math.floor(Math.random() * 6) + 5 }).map(() => ({
      id: Math.random(),
      top: `${starTop + (Math.random() * 10 - 5)}%`, // Offset +/- 5%
      left: `${starLeft + (Math.random() * 10 - 5)}%`, // Offset +/- 5%
      animationDelay: `${Math.random() * 0.5}s`,
    }));
    setHearts(prev => [...prev, ...newHearts]);
  };

  const closeModal = () => {
    setModal(null);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingStar}></div>
        <p>Connecting the stars...</p>
      </div>
    );
  }

  return (
    <div className={styles.sky} ref={skyRef}>
      {showPermissionButton && (
        <button className={styles.permissionButton} onClick={handlePermission}>
          Enable Motion
        </button>
      )}
      <audio ref={audioRef} loop src="/non.mp4" style={{ display: 'none' }} />

      <svg className={styles.constellationSvg}>
        {linePoints.map((point, i) => {
          if (i === 0) return null;
          const prevPoint = linePoints[i - 1];
          return (
            <line
              key={i}
              className={styles.constellationLine}
              x1={prevPoint.left}
              y1={prevPoint.top}
              x2={point.left}
              y2={point.top}
            />
          );
        })}
      </svg>

      <div className={styles.aurora}>
        <div className={styles.auroraCurtain}></div>
        <div className={styles.auroraCurtain}></div>
        <div className={styles.auroraCurtain}></div>
      </div>

      {stars.map((star, i) => (
        <div
          key={i}
          className={styles.star}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
            transform: star.transform
          }}
        />
      ))}

      {shootingStars.map(star => (
        <div
          key={star.key}
          className={styles.shootingStar}
          style={{
            top: star.top,
            left: star.left,
            transform: star.transform,
            animationDuration: star.animationDuration
          }}
          onAnimationEnd={() => handleAnimationEnd(star.key)}
        />
      ))}

      {memories.map((memory, i) => (
        <div
          key={`memory-${i}`}
          className={`${styles.star} ${styles.memoryStar}`}
          style={{
            top: memory.position.top,
            left: memory.position.left,
            width: '5px',
            height: '5px'
          }}
          onClick={() => openModal(memory, i)}
        />
      ))}

      {hearts.map(heart => (
        <div
          key={heart.id}
          className={styles.heart}
          style={{
            top: heart.top,
            left: heart.left,
            animationDelay: heart.animationDelay
          }}
          onAnimationEnd={() => handleHeartAnimationEnd(heart.id)}
        />
      ))}

      {modal && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <Image id="memoryImage" src={modal.image} alt="Memory" width={500} height={300} style={{ objectFit: 'cover' }}/>
            <p id="memoryText">{modal.text}</p>
          </div>
        </div>
      )}

      {showSurprise && (
        <div className={styles.surpriseMessage}>
          <h2>Nada disso poderia representar o amor e a vontade incessante de estar com você, mesmo parecendo que você esteja se afastando de mim</h2>
          <div className={styles.nebula}></div>
          <div className={styles.planetsContainer}>
            <div className={styles.planet}></div>
            <div className={styles.planet}></div>
            <div className={styles.planet}></div>
          </div>
          <button className={styles.backButton} onClick={() => {
            setShowSurprise(false);
            setClickedMemories(new Set());
            setLinePoints([]); // Reset the lines
          }}>
            Voltar para as estrelas
          </button>
        </div>
      )}
    </div>
  );
}
