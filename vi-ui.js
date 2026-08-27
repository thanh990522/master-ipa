// Vietnamese UI/explanation layer. Core IPA symbols, English words and example sentences stay in English.
(() => {
  const EXACT = new Map([
    ['Ocean Pronunciation Adventure','Hành trình phát âm dưới đại dương'],
    ['44 English Sounds • Listen • Repeat • Master','44 âm tiếng Anh • Nghe • Lặp lại • Thành thạo'],
    ['Study the full IPA sound system with audio, mouth tips, minimal pairs, flashcards, quizzes and self-recording — all in one playful learning space.','Học toàn bộ hệ thống IPA với audio, hướng dẫn khẩu hình, cặp âm dễ nhầm, flashcard, bài luyện và ghi âm trong cùng một không gian học tập trực quan.'],
    ['Your 5-step dive plan','Lộ trình học 5 bước'],
    ['the IPA symbol.','ký hiệu IPA.'],
    ['the sound and word.','âm và từ mẫu.'],
    ['your mouth correctly.','khẩu hình chính xác.'],
    ['and record yourself.','và tự ghi âm.'],
    ['with listening practice.','bằng bài luyện nghe.'],
    ['START HERE','BẮT ĐẦU TẠI ĐÂY'],
    ['The 44-Sound Phonemic Chart','Bảng 44 âm IPA tiếng Anh'],
    ['Tap any sound to hear it. Tap Study to open the full pronunciation guide.','Bấm nút 🔊 để nghe. Bấm Study để mở phần hướng dẫn phát âm đầy đủ.'],
    ['Vowels','Nguyên âm'],
    ['Air flows freely. Focus on tongue position, lip shape and length.','Luồng hơi đi ra tự do. Hãy tập trung vào vị trí lưỡi, hình dạng môi và độ dài của âm.'],
    ['Monophthongs — one steady vowel sound','Nguyên âm đơn — một âm nguyên âm ổn định'],
    ['Diphthongs — glide from one vowel position to another','Nguyên âm đôi — chuyển từ vị trí nguyên âm này sang vị trí khác'],
    ['Consonants','Phụ âm'],
    ['Air is blocked or narrowed. Learn voiced and unvoiced partners together.','Luồng hơi bị chặn hoặc thu hẹp. Nên học các cặp hữu thanh – vô thanh cùng nhau.'],
    ['DEEP DIVE','HỌC CHI TIẾT'],
    ['Learn Every Sound','Học từng âm'],
    ['Search, filter, listen and study one sound at a time.','Tìm kiếm, lọc, nghe và học sâu từng âm một.'],
    ['Sound Library','Thư viện âm'],
    ['No sounds match your filter.','Không có âm nào phù hợp với bộ lọc.'],
    ['MEMORY TRAINING','LUYỆN GHI NHỚ'],
    ['IPA Flashcards','Flashcard IPA'],
    ['Flip the card, listen, then decide whether you know the sound.','Lật thẻ, nghe âm rồi tự đánh giá xem bạn đã nhớ âm đó chưa.'],
    ['Deck Settings','Cài đặt bộ thẻ'],
    ['Deck','Bộ thẻ'],
    ['All 44 sounds','Tất cả 44 âm'],
    ['Difficult sounds','Các âm khó'],
    ['Shuffle deck','Trộn thứ tự thẻ'],
    ['Restart deck','Bắt đầu lại bộ thẻ'],
    ['Keyboard:','Phím tắt:'],
    ['Space = flip • ←/→ = change card • A = audio','Space = lật thẻ • ←/→ = đổi thẻ • A = nghe audio'],
    ['WHAT SOUND IS THIS?','ĐÂY LÀ ÂM GÌ?'],
    ['Tap to reveal','Bấm để xem đáp án'],
    ['Previous','Trước'],
    ['Next','Tiếp'],
    ['I know this','Tôi đã nhớ'],
    ['Difficult','Khó'],
    ['ACTIVE PRACTICE','LUYỆN TẬP CHỦ ĐỘNG'],
    ['Listen • Speak • Type','Nghe • Nói • Gõ từ'],
    ['Use three different modes so you do not only memorize the chart visually.','Luyện bằng ba hình thức khác nhau để bạn không chỉ ghi nhớ bảng IPA bằng mắt.'],
    ['Listen & Choose','Nghe & Chọn'],
    ['Hear & Type','Nghe & Gõ từ'],
    ['Record & Compare','Ghi âm & So sánh'],
    ['FINAL CHECK','KIỂM TRA CUỐI'],
    ['20-Question IPA Challenge','Thử thách IPA 20 câu'],
    ['A mixed quiz covering sound recognition, minimal pairs and spelling patterns.','Bài kiểm tra tổng hợp khả năng nhận diện âm, phân biệt các âm dễ nhầm và nhận biết cách viết thường gặp.'],
    ['Current','Hiện tại'],
    ['YOUR JOURNEY','TIẾN ĐỘ CỦA BẠN'],
    ['Progress Dashboard','Bảng tiến độ'],
    ['Your learning data is stored locally in this browser.','Dữ liệu học tập được lưu cục bộ trên trình duyệt này.'],
    ['Reset all progress','Xóa toàn bộ tiến độ'],
    ['Sounds learned','Âm đã học'],
    ['Difficult sounds','Âm cần luyện thêm'],
    ['Best quiz','Điểm quiz cao nhất'],
    ['Day streak','Chuỗi ngày học'],
    ['Completion by group','Tiến độ theo nhóm âm'],
    ['Focus next','Ưu tiên luyện tiếp'],
    ['Audio Settings','Cài đặt âm thanh'],
    ['Voice','Giọng đọc'],
    ['Speed','Tốc độ'],
    ['Interactive English pronunciation practice','Luyện phát âm tiếng Anh tương tác'],
    ['44-sound British English model • Browser-generated speech audio • Local progress storage','Mô hình 44 âm Anh-Anh • Audio phát bằng trình duyệt • Tiến độ lưu trên thiết bị'],
    ['Mouth position','Khẩu hình & vị trí lưỡi'],
    ['Vietnamese learner focus','Lỗi người Việt thường gặp'],
    ['Common spellings','Cách viết thường gặp'],
    ['Example words','Từ ví dụ'],
    ['Shadowing sentence','Câu luyện shadowing'],
    ['Listen','Nghe'],
    ['Slow','Nghe chậm'],
    ['Mark learned','Đánh dấu đã học'],
    ['Learned','Đã học'],
    ['Mark difficult','Đánh dấu âm khó'],
    ['Record this sound','Ghi âm âm này'],
    ['No cards','Không có thẻ'],
    ['Add difficult sounds or choose another deck.','Hãy đánh dấu một số âm khó hoặc chọn bộ thẻ khác.'],
    ['LISTEN & CHOOSE','NGHE & CHỌN'],
    ['Which IPA sound do you hear?','Bạn nghe thấy âm IPA nào?'],
    ['Play word','Nghe từ'],
    ['Next sound →','Âm tiếp theo →'],
    ['HEAR & TYPE','NGHE & GÕ TỪ'],
    ['Type the word you hear','Gõ lại từ bạn nghe được'],
    ['Check answer','Kiểm tra đáp án'],
    ['Next word →','Từ tiếp theo →'],
    ['RECORD & COMPARE','GHI ÂM & SO SÁNH'],
    ['Play sentence model','Nghe câu mẫu'],
    ['Start recording','Bắt đầu ghi âm'],
    ['Stop','Dừng'],
    ['Microphone is idle.','Micro đang sẵn sàng.'],
    ['Recording...','Đang ghi âm...'],
    ['Recording complete. Press play to compare.','Đã ghi âm xong. Bấm Play để nghe lại và so sánh.'],
    ['Ready for the 20-question challenge?','Sẵn sàng cho thử thách 20 câu?'],
    ['Questions mix listening, IPA symbols and spelling patterns.','Câu hỏi kết hợp nghe, nhận diện ký hiệu IPA và cách viết của âm.'],
    ['Start Quiz','Bắt đầu Quiz'],
    ['Challenge complete!','Hoàn thành thử thách!'],
    ['Try again','Làm lại'],
    ['No difficult sounds yet. Use ⭐ while studying to build a personal focus list.','Bạn chưa đánh dấu âm khó nào. Hãy dùng ⭐ khi học để tạo danh sách âm cần ưu tiên luyện.']
  ]);

  const GROUPS = new Map([
    ['Plosives','Âm tắc'],['Fricatives','Âm xát'],['Affricates','Âm tắc-xát'],['Nasals','Âm mũi'],['Approximants','Âm tiếp cận'],['Lateral','Âm bên'],
    ['Monophthongs','Nguyên âm đơn'],['Diphthongs','Nguyên âm đôi'],['Consonants','Phụ âm'],['Monophthong','Nguyên âm đơn'],['Diphthong','Nguyên âm đôi'],['Consonant','Phụ âm']
  ]);

  function replaceTextValue(text){
    const trimmed=text.trim();
    if(EXACT.has(trimmed)) return text.replace(trimmed,EXACT.get(trimmed));
    if(GROUPS.has(trimmed)) return text.replace(trimmed,GROUPS.get(trimmed));
    if(/^\d+ sounds?$/.test(trimmed)){const n=trimmed.match(/\d+/)[0];return text.replace(trimmed,`${n} âm`)}
    if(/^Score:\s*\d+\s*\/\s*\d+$/.test(trimmed)) return text.replace('Score:','Điểm:');
    if(trimmed.startsWith('Correct!')) return text.replace('Correct!','Chính xác!');
    if(trimmed.startsWith('Not quite.')) return text.replace('Not quite.','Chưa đúng.');
    if(trimmed.startsWith('Answer:')) return text.replace('Answer:','Đáp án:');
    if(trimmed.startsWith('Correct answer:')) return text.replace('Correct answer:','Đáp án đúng:');
    if(trimmed.startsWith('QUESTION ') && trimmed.includes(' OF ')) return text.replace('QUESTION','CÂU').replace(' OF ',' / ').replace('LISTENING','NGHE').replace('WORD RECOGNITION','NHẬN DIỆN TỪ').replace('SPELLING','CÁCH VIẾT');
    if(trimmed.startsWith('You got ') && trimmed.includes(' correct.')) return text.replace('You got ','Bạn đúng ').replace(' out of ',' / ').replace(' correct.',' câu.');
    return text;
  }

  function localize(root=document.body){
    if(!root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{const next=replaceTextValue(n.nodeValue);if(next!==n.nodeValue)n.nodeValue=next});
    root.querySelectorAll?.('[placeholder]').forEach(el=>{
      const p=el.getAttribute('placeholder');
      const map={
        'Search IPA, keyword or spelling…':'Tìm IPA, từ mẫu hoặc cách viết…',
        'Type the word…':'Gõ từ bạn nghe được…'
      };if(map[p])el.setAttribute('placeholder',map[p]);
    });
    root.querySelectorAll?.('[title]').forEach(el=>{
      const t=el.getAttribute('title');
      const map={'Print IPA chart':'In bảng IPA','Toggle ocean depth':'Đổi giao diện sáng/tối','Audio settings':'Cài đặt âm thanh','Play keyword':'Nghe từ mẫu','Play keyword slowly':'Nghe từ mẫu chậm','Study':'Học chi tiết','Listen':'Nghe','Slow':'Nghe chậm'};
      if(map[t])el.setAttribute('title',map[t]);
    });
    const auto=document.querySelector('#auto-audio')?.closest('label');if(auto)auto.style.display='none';
  }

  localize();
  const observer=new MutationObserver(mutations=>{mutations.forEach(m=>m.addedNodes.forEach(node=>{if(node.nodeType===1)localize(node);else if(node.nodeType===3){const next=replaceTextValue(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next}}))});
  observer.observe(document.body,{childList:true,subtree:true});
})();
