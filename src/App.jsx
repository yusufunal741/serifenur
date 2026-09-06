import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const audioRef = useRef(null);
  const giftAudioRef = useRef(null);

  const MUSIC_START = 328; // İlk şarkı: 5:28
  const MUSIC_END = 360;   // İlk şarkı: 6:00

  const GIFT_MUSIC_START = 161; // İkinci şarkı: 2:41

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = MUSIC_START;
      audioRef.current.volume = 0.7;

      audioRef.current.play().catch((error) => {
        console.log("Müzik başlatılamadı:", error);
      });
    }

    setStarted(true);
  };

  const openGift = () => {
    // İlk şarkıyı durdur
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Hediyeyi aç
    setGiftOpened(true);

    // İkinci şarkıyı 2:41'den başlat
    setTimeout(() => {
      if (giftAudioRef.current) {
        giftAudioRef.current.currentTime = GIFT_MUSIC_START;
        giftAudioRef.current.volume = 0.7;

        giftAudioRef.current.play().catch((error) => {
          console.log("Hediye müziği başlatılamadı:", error);
        });
      }
    }, 100);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const checkMusicTime = () => {
      if (audio.currentTime >= MUSIC_END) {
        audio.pause();
        audio.currentTime = MUSIC_START;
      }
    };

    audio.addEventListener("timeupdate", checkMusicTime);

    return () => {
      audio.removeEventListener("timeupdate", checkMusicTime);
    };
  }, []);

  return (
    <main className="birthday-page">

      {/* İlk şarkı */}
      <audio
        ref={audioRef}
        src="/birthday-song.mp3"
        preload="auto"
      />

      {/* Hediye açılınca çalacak ikinci şarkı */}
      <audio
        ref={giftAudioRef}
        src="/hediye-sarki.mp3"
        preload="auto"
      />

      {/* Dekoratif kalpler */}
      <div className="heart heart-1">♡</div>
      <div className="heart heart-2">♡</div>
      <div className="heart heart-3">♡</div>

      {/* Parıltılar */}
      <div className="sparkle sparkle-1">✦</div>
      <div className="sparkle sparkle-2">✧</div>
      <div className="sparkle sparkle-3">✦</div>

      {/* Giriş */}
      <section className="hero">

        <p className="small-title">
          12 EYLÜL 2026
        </p>

        <h1>
          İyi ki doğdun
          <span>Şerifenur</span>
        </h1>

        {!started ? (
          <>
            <p className="message">
              Senin için küçük bir şey hazırladım...
              <br />
              🤍
            </p>

            <button
              className="start-button"
              onClick={startMusic}
            >
              🎵 Müziği Başlat
              <span>♡</span>
            </button>
          </>
        ) : (
          <>
            <p className="message">
              İyi ki varsın...
              <br />
              İyi ki hayatımdasın. 🤍
            </p>

            <div className="scroll-hint">
              <span>↓</span>
              <small>devam et</small>
            </div>
          </>
        )}

      </section>

      {/* Fotoğraflar */}
      {started && (
        <section className="memories">

          <div className="photo-card">
            <img
              src="/photos/foto1.jpg"
              alt="Şerifenur ile anımız"
            />
            <p>Çektiğim ilk fotoğrafın</p>
          </div>

          <div className="photo-card">
            <img
              src="/photos/foto2.jpg"
              alt="Birlikte güzel bir anımız"
            />
          </div>

          <div className="photo-card photo-three">
  <img
    src="/photos/foto3.jpg"
    alt="Birlikte güzel bir anımız"
  />
</div>

          <p className="love-note">
            Seni seviyorum
            <span>♡</span>
          </p>

          <div className="photo-card">
            <img
              src="/photos/foto4.jpg"
              alt="Birlikte güzel bir anımız"
            />
          </div>

          <div className="photo-card">
            <img
              src="/photos/foto5.jpg"
              alt="Birlikte güzel bir anımız"
            />
          </div>

          <p className="love-note">
            İyi ki hayatımdasın
            <span>♡</span>
          </p>

          <div className="photo-card last-photo">
            <img
              src="/photos/foto6.jpg"
              alt="En güzel anılarımızdan biri"
            />
          </div>

          {/* Hediye */}
          <div className="gift-section">

            <p className="message">
              En çok sevdiğin şeyler arasında günübirlik Eskişehir
              <br />
              ve bazı sanatçılar var...
              🤍
            </p>

            {!giftOpened ? (
              <button
                className="start-button gift-button"
                onClick={openGift}
              >
                🎁 Hediyeni Aç
                <span>♡</span>
              </button>
            ) : (
              <div className="gift-reveal">

                <div className="gift-hearts">
                  <span>♡</span>
                  <span>♥</span>
                  <span>♡</span>
                  <span>♥</span>
                  <span>♡</span>
                </div>

                <div className="photo-card gift-photo">
                  <img
                    src="/yalin.jpg"
                    alt="Yalın konseri"
                  />
                </div>

                <div className="gift-hearts">
                  <span>♥</span>
                  <span>♡</span>
                  <span>♥</span>
                  <span>♡</span>
                  <span>♥</span>
                </div>

                <h2 className="gift-title">
                  ESKİŞEHİR YALIN KONSERİNE
                  <br />
                  GİDİYORUZ ❤️
                </h2>

              </div>
            )}

          </div>

        </section>
      )}

    </main>
  );
}

export default App;