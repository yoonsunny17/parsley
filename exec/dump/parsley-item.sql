insert into item_seed (name, sley, growth_time) values("일반씨앗", 0, 120);
insert into item_seed (name, sley, growth_time) values("희귀씨앗", 100, 240);
insert into item_seed (name, sley, growth_time) values("영웅씨앗", 200, 360);
insert into item_seed (name, sley, growth_time) values("전설씨앗", 350, 480);
insert into item_seed (name, sley, growth_time) values("미스테리씨앗", 500, 600);

insert into item_fertilizer (name, sley, sley_rate) values("선택안함", 0, 0);
insert into item_fertilizer (name, sley, sley_rate) values("일반비료", 150, 10);
insert into item_fertilizer (name, sley, sley_rate) values("고급비료", 200, 20);
insert into item_fertilizer (name, sley, sley_rate) values("프로틴비료", 300, 30);
insert into item_fertilizer (name, sley, sley_rate) values("최상급비료", 500, 50);


insert into item_water (name, sley, time_rate) values("선택안함", 0, 0);
insert into item_water (name, sley, time_rate) values("일반물뿌리개", 250, 20);
insert into item_water (name, sley, time_rate) values("고급물뿌리개", 500, 30);

insert into herb_rate (herb_rate, herb_type, item_seed_id) values (100, "COMMON", 1);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (4, "RARE", 1);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (1, "EPIC", 1);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (0, "LEGENDARY", 1);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (0, "MYSTERY", 1);

insert into herb_rate (herb_rate, herb_type, item_seed_id) values (100, "COMMON", 2);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (10, "RARE", 2);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (4, "EPIC", 2);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (1, "LEGENDARY", 2);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (0, "MYSTERY", 2);

insert into herb_rate (herb_rate, herb_type, item_seed_id) values (100, "COMMON", 3);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (20, "RARE", 3);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (10, "EPIC", 3);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (2, "LEGENDARY", 3);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (0, "MYSTERY", 3);

insert into herb_rate (herb_rate, herb_type, item_seed_id) values (100, "COMMON", 4);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (30, "RARE", 4);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (15, "EPIC", 4);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (5, "LEGENDARY", 4);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (0, "MYSTERY", 4);

insert into herb_rate (herb_rate, herb_type, item_seed_id) values (100, "COMMON", 5);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (20, "RARE", 5);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (10, "EPIC", 5);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (5, "LEGENDARY", 5);
insert into herb_rate (herb_rate, herb_type, item_seed_id) values (2, "MYSTERY", 5);

insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "파슬리", 10, "https://cdn-icons-png.flaticon.com/128/6969/6969467.png", "모두함께 PARSLEY!");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "바질", 10, "https://cdn-icons-png.flaticon.com/128/6969/6969376.png", "음식 위에 바질 올리면 200% 더 맛있어 보여요");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "자스민", 10, "https://cdn-icons-png.flaticon.com/128/6969/6969370.png", "자스민 티 마시면 잠이 잘와요");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "캣잎", 10, "https://cdn-icons-png.flaticon.com/128/6969/6969408.png", "나는 깻잎이 아니애오옹");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "오레가노", 10, "https://cdn-icons-png.flaticon.com/128/6969/6969376.png", "이거 먹으면 집중력이 오레가노? 킥킥..");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "민트", 10, "https://cdn-icons-png.flaticon.com/128/6969/6969421.png", "민초파 모여라~");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "제라늄", 15, "https://cdn-icons-png.flaticon.com/512/4591/4591997.png", "제라늄 처음 들어본다늄?");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "히비스커스", 15, "https://cdn-icons-png.flaticon.com/512/3024/3024985.png", "오늘의 알쓸신잡! PARSLEY 프론트엔드 전ㅇㅇ은 별다방의 히비스커스 티를 좋아함");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "라벤더", 15, "https://cdn-icons-png.flaticon.com/128/6969/6969432.png", "라벤더는 향도 좋지만 색도 이뻐요");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "레몬밤", 15, "https://cdn-icons-png.flaticon.com/512/4327/4327963.png", "설마 진짜로 레몬밤이랑 레몬이랑 같다고 생각하지는 않겠죠오오오?");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "로즈마리", 15, "https://cdn-icons-png.flaticon.com/128/6969/6969378.png", "킁킁... 어디서 좋은 냄새가 나는데요?");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "딜", 20, "https://cdn-icons-png.flaticon.com/128/6969/6969443.png", "오늘 레몬 딜 버터를 만들어 보는건 어때요?");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "카모마일", 20, "https://cdn-icons-png.flaticon.com/128/6969/6969405.png", "잠 안올 때 캐모마일이 좋대요. 그래서 내가 잠이 오는건ㄱㅏ...");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "스테비아", 20, "https://cdn-icons-png.flaticon.com/128/6969/6969410.png", "다이어터들의 사랑! 당은 포기모태~");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "씨슬", 20, "https://cdn-icons-png.flaticon.com/512/2382/2382409.png", "그거 아세요? 간에 좋은 밀크씨슬이라는 약초는 씨슬이라는 꽃의 줄기에서 나오는 우윳빛 진액이며, 한국식 이름은 엉겅퀴래요.");
insert into herb_book (herb_type, name, point, image_url, description) values ("COMMON", "타임", 20, "https://cdn-icons-png.flaticon.com/128/6969/6969429.png", "타임이 노화 방지에 좋대요.. 얼른 구하러 가야겠다!");

insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "프로틴 중독 파슬리", 30, "https://cdn-icons-png.flaticon.com/128/4257/4257224.png", "근육으로 똘똘 뭉친 파슬리이다... 먹으면 막강해질지도... ?");
insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "바지 아니고 바질", 30, "https://cdn-icons-png.flaticon.com/512/1255/1255091.png", "발음을 조심해 주세요! 바지아니고 바 질 !");
insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "고양이가 좋아하는 캣잎", 30, "https://cdn-icons-png.flaticon.com/128/1064/1064046.png", "고양이도 깻잎 좋아한다옹!");
insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "향기나는 자스민", 30, "https://cdn-icons-png.flaticon.com/512/1992/1992720.png", "그대 모습은~ 보라빛처럼~ 살며시 다가왔지~");
insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "더오레오레가노", 40, "https://cdn-icons-png.flaticon.com/512/1255/1255089.png", "이 오레가노 오일이 더 오레오레가나 아니면 저 오레가노 오일이 더 오레오레가노??");
insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "제가 제라늄?", 40, "https://cdn-icons-png.flaticon.com/128/6969/6969374.png", "쟤가 제라늄? 아니라늄? 그럼 말라늄~!");
insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "치약맛 민트", 40, "https://cdn-icons-png.flaticon.com/512/1255/1255078.png", "민트가 치약맛이 아니라 치약이 민트맛인거라구욧!");
insert into herb_book (herb_type, name, point, image_url, description) values ("RARE", "살이 쭉쭉 빠지는 히비스커스", 40, "https://cdn-icons-png.flaticon.com/512/1255/1255087.png", "너무 많이 빠진다고 놀라지 마세요! 단, 요요는 보장할 수 없습니다.");

insert into herb_book (herb_type, name, point, image_url, description) values ("EPIC", "근육돼지 파슬리", 50, "https://cdn-icons-png.flaticon.com/128/3969/3969799.png", "3대 500 치는 파슬리이다. 약간 반할지도?");
insert into herb_book (herb_type, name, point, image_url, description) values ("EPIC", "떠든애가 제라늄!", 50, "https://cdn-icons-png.flaticon.com/512/3160/3160580.png", "공부하는데 떠드는 사람이 제라늄?");
insert into herb_book (herb_type, name, point, image_url, description) values ("EPIC", "알라딘 여친 자스민", 60, "https://cdn-icons-png.flaticon.com/128/3802/3802021.png", "비나이다..비나이다.. 저도 짝이 생기게 해주세요..");
insert into herb_book (herb_type, name, point, image_url, description) values ("EPIC", "이야 진짜 겁나 오레오레오레가노", 60, "https://cdn-icons-png.flaticon.com/512/1255/1255085.png", "지금은 새벽 4시 13분 ...5레5 우유에 찍어서 먹고싶당..");

insert into herb_book (herb_type, name, point, image_url, description) values ("LEGENDARY", "고수", 70, "https://cdn-icons-png.flaticon.com/128/8257/8257154.png", "너무 눈이 부셔서 이목구비가 보이질 않아 ...");
insert into herb_book (herb_type, name, point, image_url, description) values ("LEGENDARY", "유교보이가 제라늄?", 80, "https://cdn-icons-png.flaticon.com/512/2922/2922546.png", "아~ 파슬리~ 가보자고~");
insert into herb_book (herb_type, name, point, image_url, description) values ("LEGENDARY", "자스민마", 90, "https://cdn-icons-png.flaticon.com/512/2922/2922554.png", "PARSLEY 여신 쟈스민ma!");

insert into herb_book (herb_type, name, point, image_url, description) values ("MYSTERY", "썩슬리", 100, "https://cdn-icons-png.flaticon.com/512/7564/7564946.png","킼...ㅋ키킼...킼... 용감한 녀석... 감히 이몸을 깨우다니...겁도없군 킼ㅋ...");
