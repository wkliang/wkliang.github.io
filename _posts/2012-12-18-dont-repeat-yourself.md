---
layout: post
title: 架構網站的架構
category:thinking
---

寫個幾個 android 的程式，又把眼光焦點移回網站架構的問題。
隨手 google 就抓到一大堆的文章，太垃圾的就不論，言之有物、條理清晰的也需要大量的時間腦力來消化。

write less do more... 這個原則很有趣，也很值得深思。
如果這個原則成立，選用的 script 應該朝向更有表現力的 language，而非一昧強調高效。
畢竟所有優化 byte code、just in time、vm、、都比不上 natvive C 實作。

don't repeat yourself...牽扯大量天人交戰的取捨，不可避免的一直 refactoring 的過程。
理想上，DRY 可以讓程式的架構更清晰，容易判斷問題之所在。 提高生產力？我看未必！

私以為，是否 over dry 的判斷依據：抽離出來的部份～邏輯上是否有獨立～可被其他 module 重複使用的價值？

Convention Over Configuration... 還沒更深一層思考，先放著。


* jekyll 跟小日本的 wiki template 相比，有什麼優缺點？
* 把 servent 放上 github ～ 有不一樣的發展方向
* ch8 functional programming 相關的 paradigms 需更熟悉，特別是 map/reduce
* [郭家兄弟創業系列：新創網站這樣開發才夠快](http://www.kuobrothers.com/article-124.htm)
* [XDite: 新創網站這樣開發才夠快](http://blog.xdite.net/posts/2012/04/07/startup-rapid-development/)
* [DRY-Less vs. DRY-More ( Don't Repeat Yourself )](http://stackoverflow.com/questions/11640687/dry-less-vs-dry-more-dont-repeat-yourself)


// EOT


{% include references.md %}
