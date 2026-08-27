(() => {
  const sounds = window.IPA_SOUNDS || [];
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  const state = {
    current: 0,
    studied: new Set(JSON.parse(localStorage.getItem('masterIPA_studied') || '[]')),
    best: Number(localStorage.getItem('masterIPA_best') || 0),
    quiz: {round:0, score:0, target:null, answered:false},
    recorder: null,
    chunks: [],
    stream: null
  };

  const refs = {
    tabs: $$('.tab'),
    views: $$('.view'),
    grid: $('#soundGrid'),
    search: $('#search'),
    groupFilter: $('#groupFilter'),
    soundList: $('#soundList'),
    statSeen: $('#statSeen'),
    statBest: $('#statBest'),
    trainerSymbol: $('#trainerSymbol'),
    trainerGroup: $('#trainerGroup'),
    trainerName: $('#trainerName'),
    trainerSpellings: $('#trainerSpellings'),
    trainerExamples: $('#trainerExamples'),
    trainerTrap: $('#trainerTrap'),
    trainerDrill: $('#trainerDrill'),
    trainerPair: $('#trainerPair'),
    markStudied: $('#markStudied'),
    randomSound: $('#randomSound'),
    playDrill: $('#playDrill'),
    slowDrill: $('#slowDrill'),
    goRecord: $('#goRecord'),
    quizRound: $('#quizRound'),
    quizBar: $('#quizBar'),
    quizChoices: $('#quizChoices'),
    quizFeedback: $('#quizFeedback'),
    quizScore: $('#quizScore'),
    playQuizWord: $('#playQuizWord'),
    nextQuiz: $('#nextQuiz'),
    quizCard: $('#quizCard'),
    quizResult: $('#quizResult'),
    finalScore: $('#finalScore'),
    finalMessage: $('#finalMessage'),
    restartQuiz: $('#restartQuiz'),
    recordSound: $('#recordSound'),
    recordSymbol: $('#recordSymbol'),
    recordWords: $('#recordWords'),
    recordSentence: $('#recordSentence'),
    listenTarget: $('#listenTarget'),
    startRecord: $('#startRecord'),
    stopRecord: $('#stopRecord'),
    recordStatus: $('#recordStatus'),
    playback: $('#recordingPlayback'),
    toast: $('#toast')
  };

  function normalize(s='') {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  }

  function showToast(msg) {
    refs.toast.textContent = msg;
    refs.toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => refs.toast.classList.remove('show'), 1700);
  }

  function saveProgress() {
    localStorage.setItem('masterIPA_studied', JSON.stringify([...state.studied]));
    localStorage.setItem('masterIPA_best', String(state.best));
    updateStats();
  }

  function updateStats() {
    refs.statSeen.textContent = state.studied.size;
    refs.statBest.textContent = `${state.best}%`;
  }

  function voiceForEnglish() {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /^en-GB/i.test(v.lang)) ||
           voices.find(v => /^en-US/i.test(v.lang)) ||
           voices.find(v => /^en/i.test(v.lang)) ||
           null;
  }

  function speak(text, rate=0.88) {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech is not supported in this browser.');
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voiceForEnglish()?.lang || 'en-GB';
    u.voice = voiceForEnglish();
    u.rate = rate;
    u.pitch = 1;
    speechSynthesis.speak(u);
  }

  function switchView(view) {
    refs.tabs.forEach(t => t.classList.toggle('active', t.dataset.view === view));
    refs.views.forEach(v => v.classList.toggle('active', v.id === `view-${view}`));
    if (view === 'record') syncRecordView(state.current);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  function soundCard(s, index) {
    const studied = state.studied.has(s.symbol);
    return `
      <button class="sound-card" data-index="${index}">
        <div class="top">
          <div class="phoneme">/${s.symbol}/ ${studied ? '✓' : ''}</div>
          <span class="group-tag">${s.group}</span>
        </div>
        <div class="sound-name">${s.name}</div>
        <div class="examples">${s.examples.join(' • ')}</div>
        <span class="mini-audio" data-speak="${s.examples[0]}">🔊 ${s.examples[0]}</span>
      </button>`;
  }

  function renderGrid() {
    const q = normalize(refs.search.value);
    const group = refs.groupFilter.value;
    const matches = sounds
      .map((s,index)=>({s,index}))
      .filter(({s}) => group === 'All' || s.group === group)
      .filter(({s}) => !q || normalize([s.symbol,s.name,...s.examples,...s.spellings].join(' ')).includes(q));
    refs.grid.innerHTML = matches.length ? matches.map(({s,index})=>soundCard(s,index)).join('') : `<div class="empty">No sounds match your search.</div>`;
  }

  function renderSoundList() {
    refs.soundList.innerHTML = sounds.map((s,i)=>`
      <button class="sound-chip ${i===state.current?'active':''} ${state.studied.has(s.symbol)?'studied':''}" data-index="${i}" title="${s.name}">/${s.symbol}/</button>
    `).join('');
  }

  function renderTrainer(index) {
    state.current = index;
    const s = sounds[index];
    refs.trainerSymbol.textContent = `/${s.symbol}/`;
    refs.trainerGroup.textContent = s.group;
    refs.trainerName.textContent = s.name;
    refs.trainerSpellings.innerHTML = s.spellings.map(x=>`<span>${x}</span>`).join('');
    refs.trainerExamples.innerHTML = s.examples.map(w=>`<button class="word-btn" data-word="${w}">🔊 ${w}</button>`).join('');
    refs.trainerTrap.textContent = s.trap;
    refs.trainerDrill.textContent = s.drill;
    refs.trainerPair.innerHTML = `<span>${s.pair[0]}</span><b>VS</b><span>${s.pair[1]}</span>`;
    refs.markStudied.textContent = state.studied.has(s.symbol) ? '✓ Studied' : '✓ Mark studied';
    renderSoundList();
  }

  function selectSound(index, toTrainer=true) {
    renderTrainer(index);
    if (toTrainer) switchView('trainer');
  }

  function buildRecordSelect() {
    refs.recordSound.innerHTML = sounds.map((s,i)=>`<option value="${i}">/${s.symbol}/ — ${s.name}</option>`).join('');
  }

  function syncRecordView(index) {
    const s = sounds[index];
    refs.recordSound.value = String(index);
    refs.recordSymbol.textContent = `/${s.symbol}/`;
    refs.recordWords.textContent = s.examples.join(' • ');
    refs.recordSentence.textContent = s.drill;
  }

  function startQuiz() {
    state.quiz = {round:0, score:0, target:null, answered:false};
    refs.quizResult.classList.add('hidden');
    refs.quizCard.classList.remove('hidden');
    nextQuizRound();
  }

  function nextQuizRound() {
    if (state.quiz.round >= 10) return finishQuiz();
    state.quiz.round += 1;
    state.quiz.answered = false;
    refs.nextQuiz.disabled = true;
    refs.quizFeedback.textContent = '';
    refs.quizFeedback.className = 'feedback';
    const pool = sounds.filter(s => s.pair && s.pair.length === 2);
    const s = pool[Math.floor(Math.random()*pool.length)];
    const target = s.pair[Math.floor(Math.random()*2)];
    state.quiz.target = {sound:s, word:target};
    refs.quizRound.textContent = `Round ${state.quiz.round} / 10`;
    refs.quizBar.style.width = `${state.quiz.round*10}%`;
    refs.quizScore.textContent = `${state.quiz.score}/${state.quiz.round-1}`;
    const choices = Math.random() > .5 ? [...s.pair] : [s.pair[1],s.pair[0]];
    refs.quizChoices.innerHTML = choices.map(w=>`<button class="choice" data-choice="${w}">${w}</button>`).join('');
    setTimeout(()=>speak(target, .78), 200);
  }

  function answerQuiz(word, btn) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;
    const correct = word === state.quiz.target.word;
    if (correct) {
      state.quiz.score += 1;
      btn.classList.add('correct');
      refs.quizFeedback.textContent = `Correct — /${state.quiz.target.sound.symbol}/`;
      refs.quizFeedback.classList.add('ok');
    } else {
      btn.classList.add('wrong');
      $$('.choice', refs.quizChoices).find(b=>b.dataset.choice === state.quiz.target.word)?.classList.add('correct');
      refs.quizFeedback.textContent = `It was “${state.quiz.target.word}”. Replay it and compare.`;
      refs.quizFeedback.classList.add('bad');
    }
    refs.quizScore.textContent = `${state.quiz.score}/${state.quiz.round}`;
    refs.nextQuiz.disabled = false;
  }

  function finishQuiz() {
    const percent = state.quiz.score * 10;
    state.best = Math.max(state.best, percent);
    saveProgress();
    refs.quizCard.classList.add('hidden');
    refs.quizResult.classList.remove('hidden');
    refs.finalScore.textContent = `${percent}%`;
    refs.finalMessage.textContent =
      percent >= 90 ? 'Excellent discrimination. Keep shadowing the pairs you find hardest.' :
      percent >= 70 ? 'Good work. Repeat the missed pairs and focus on vowel length and voicing.' :
      'Build your ear first: replay the pairs slowly, then retake the quiz.';
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      refs.recordStatus.textContent = 'Recording is not supported in this browser.';
      return;
    }
    try {
      state.stream = await navigator.mediaDevices.getUserMedia({audio:true});
      state.chunks = [];
      state.recorder = new MediaRecorder(state.stream);
      state.recorder.ondataavailable = e => e.data.size && state.chunks.push(e.data);
      state.recorder.onstop = () => {
        const blob = new Blob(state.chunks, {type: state.recorder.mimeType || 'audio/webm'});
        const url = URL.createObjectURL(blob);
        refs.playback.src = url;
        refs.playback.classList.remove('hidden');
        refs.recordStatus.textContent = 'Recording ready. Listen and compare with the model.';
        state.stream?.getTracks().forEach(t=>t.stop());
        state.stream = null;
      };
      state.recorder.start();
      refs.startRecord.disabled = true;
      refs.startRecord.classList.add('live');
      refs.startRecord.textContent = '● Recording…';
      refs.stopRecord.disabled = false;
      refs.recordStatus.textContent = 'Recording now. Say the example words and sentence naturally.';
    } catch (err) {
      refs.recordStatus.textContent = 'Microphone permission was not granted.';
    }
  }

  function stopRecording() {
    if (state.recorder?.state === 'recording') state.recorder.stop();
    refs.startRecord.disabled = false;
    refs.startRecord.classList.remove('live');
    refs.startRecord.textContent = '● Start recording';
    refs.stopRecord.disabled = true;
  }

  refs.tabs.forEach(t => t.addEventListener('click', () => switchView(t.dataset.view)));
  refs.search.addEventListener('input', renderGrid);
  refs.groupFilter.addEventListener('change', renderGrid);

  refs.grid.addEventListener('click', e => {
    const speakEl = e.target.closest('[data-speak]');
    if (speakEl) {
      e.stopPropagation();
      speak(speakEl.dataset.speak);
      return;
    }
    const card = e.target.closest('.sound-card');
    if (card) selectSound(Number(card.dataset.index));
  });

  refs.soundList.addEventListener('click', e => {
    const b = e.target.closest('.sound-chip');
    if (b) renderTrainer(Number(b.dataset.index));
  });

  refs.trainerExamples.addEventListener('click', e => {
    const b = e.target.closest('[data-word]');
    if (b) speak(b.dataset.word);
  });

  refs.markStudied.addEventListener('click', () => {
    const symbol = sounds[state.current].symbol;
    if (state.studied.has(symbol)) {
      state.studied.delete(symbol);
      showToast(`/${symbol}/ removed from studied.`);
    } else {
      state.studied.add(symbol);
      showToast(`/${symbol}/ marked as studied.`);
    }
    saveProgress();
    renderTrainer(state.current);
    renderGrid();
  });

  refs.randomSound.addEventListener('click', () => renderTrainer(Math.floor(Math.random()*sounds.length)));
  refs.playDrill.addEventListener('click', () => speak(sounds[state.current].drill, .84));
  refs.slowDrill.addEventListener('click', () => speak(sounds[state.current].drill, .62));
  refs.goRecord.addEventListener('click', () => switchView('record'));

  refs.playQuizWord.addEventListener('click', () => state.quiz.target && speak(state.quiz.target.word, .72));
  refs.quizChoices.addEventListener('click', e => {
    const b = e.target.closest('.choice');
    if (b) answerQuiz(b.dataset.choice, b);
  });
  refs.nextQuiz.addEventListener('click', nextQuizRound);
  refs.restartQuiz.addEventListener('click', startQuiz);

  refs.recordSound.addEventListener('change', () => {
    state.current = Number(refs.recordSound.value);
    renderTrainer(state.current);
    syncRecordView(state.current);
  });
  refs.listenTarget.addEventListener('click', () => speak(sounds[Number(refs.recordSound.value)].drill, .82));
  refs.startRecord.addEventListener('click', startRecording);
  refs.stopRecord.addEventListener('click', stopRecording);

  renderGrid();
  renderSoundList();
  renderTrainer(0);
  buildRecordSelect();
  syncRecordView(0);
  updateStats();
  startQuiz();

  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => voiceForEnglish();
  }
})();
