$(function () {

  // 정기후원 - 자동이체, 신용카드 선택시
  $(".radio_paymethod").change(function () {

    for (var bt = 0; bt < $(".radio_paymethod").length; bt++) {

      if ($(".radio_paymethod").eq(bt).is(":checked")) {
        if ($(".radio_paymethod").eq(bt).val() == "R001") {
          $(".card_pay").addClass("on");
          $(".auto_pay").removeClass("on");

        } else if ($(".radio_paymethod").eq(bt).val() == "R002") {
          $(".auto_pay").addClass("on");
          $(".card_pay").removeClass("on");

        } else {
          $("#auto_pay").removeClass("on");
          $("#card_pay").removeClass("on");
        }
      }
    }
  });


  // 정기후원, 일시후원 선택 시
  $(".radio_donate_type").change(function () {

    if ($(".radio_donate_type").eq(0).is(":checked")) {
      $(".donate_form .pay_method1").show();
      $(".donate_form .pay_method2").hide();
      $(".do_price1").show();
      $(".do_price2").hide();
      $(".rd_amount").eq(0).prop("checked", true).trigger("click");

    } else {
      $(".donate_form .pay_method1").hide();
      $(".donate_form .pay_method2").show();
      $(".do_price1").hide();
      $(".do_price2").show();
      $(".rd_amount").eq(3).prop("checked", true).trigger("click");
    }
    // console.log("step1js");
  }).trigger("change");



  // 후원금액 선택 및 직접 입력 컨트롤
  $(document).on("change", ".rd_amount", function () {
    //후원금액 라디오 버튼 선택 시, 직접입력 비우기
    if ($(".rd_amount:checked").length > 0) {
      $(".direct_amount").val("").removeClass("onf");
    }
  });

  // 후원금액 직접입력 focus 시, 라이오 버튼 선택 해제 
  $(document).on("focus", ".direct_amount", function () {
    $(this).addClass("onf");
    $(".rd_amount").prop("checked", false);

  }).on("keyup", ".direct_amount", function () {
    // 금액 입력 제어 ( 콤마 및 숫자 )
    $(this).val($(this).val().replace(/[^\d]+/, ''));
    // $(this).val(make_price_format($(this).val()));
  }).on("blur", ".direct_amount", function () {
    if ($(this).val() != "") { // 값이 있다면
      $(".rd_amount").prop("checked", false);
      if (!$(this).hasClass("onf")) {
        $(this).addClass("onf");
      }
    } else {
      // 값이 없다면
      $(this).siblings(".rd_amount").prop("checked", true).trigger("click");
      $(this).removeClass("onf");
    }
  });




  // 전체동의
  $("#admit-all").click(function () {

    if ($("#admit-all").prop("checked")) {
      $("input[name=chk]").prop("checked", true);
    } else {
      $("input[name=chk]").prop("checked", false);
    }
  });


}); //function


// 전체 동의 하기
// $(".agree").on("click", "#admit-all", function () {
//   $(this).parents(".agree").find('input').prop("checked", $(this).is(":checked"));
// });

// // 체크박스 개별 선택
// $(".agree").on("click", ".admit_normal", function () {
//   var is_checked = true;

//   $(".agree .admit_normal").each(function () {
//     is_checked = is_checked && $(this).is(":checked");
//   });

//   $("#admit-all").prop("checked", is_checked);
// });



/*--------------------------------
이메일 도메인 옵션 정하기
----------------------------------*/
function email_change() {
  var email_sel = document.getElementById("email_sel");
  var email_dns = document.getElementById("email_dns");

  // option value 가져오기
  var get_value = email_sel.options[document.getElementById("email_sel").selectedIndex].value;

  email_dns.value = get_value;

  console.log(email_dns.value);
};

// 이메일 검증
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};



// 유효성 검사
function formCheck() {
  var invalid = false;
  var invalidtopelem;
  var number_check = /^[0-9]*$/;
  var korean_check = /([^가-힣\x20])/i;
  var korean_combination_check = /([^ㄱ-ㅎㅏ-ㅣ\x20])/i;
  var korean_combination_english_check = /([^a-zA-Z가-힣 \x20])/i;
  var korean_english_parenthesis_check = /^[a-zA-Z가-힣()]*$/;
  var korean_english_check = /([^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;



  var do_type = $(".donate_type input[name=do_type]:checked").val();
  var pay_method1 = $(".pay_method1 input[name=pay-1]:checked").val();
  var pay_method2 = $(".pay_method1 input[id=pay-2]:checked").val();
  var productcode = $("#productcode");

  // 자동이체 auto_pay
  var bankcode = $("#bankcode");
  var bank_account = $("#bank_account");
  var bank_owner = $("#bank_owner");
  var bank_owner_birth = $("#bank_owner_birth");
  var withdrawday = $("#withdrawday");

  // 신용카드 card_pay
  var card_no = $("#card_num");
  var card_expire_mm = $("#card_expire_mm");
  var card_expire_yy = $("#card_expire_yy");
  var card_owner = $("#card_owner");
  var card_owner_birth = $("#card_owner_birth");
  var card_pwd = $("#card_pwd");
  var card_withdrawday = $("#card_withdrawday");

  var direct_amount = $(".direct_amount");

  var mem_nm = $("#mem_nm");
  var phone1 = $("#phone1");
  var phone2 = $("#phone2");
  var phone3 = $("#phone3");
  var email_id = $("#email_id");
  var email_dns = $("#email_dns");

  var agree1 = $("#admit-1");
  var agree2 = $("#admit-2");


  // 납입주기 (정기 or 일시 )
  if (do_type == "" || do_type == "undefined") {
    alert("납입주기를 선택해주세요.");
    $("#do_type1").focus();
    return false;
  };


  // 상품
  if (productcode.val() == "") {
    alert("상품을 선택해주세요.");
    productcode.focus();
    return false;
  }

  // 직접입력금액이 존재할 경우
  // if (direct_amount.val() != "") {
  // var minprice1 = service.current_productlist[service.current_productidx].minprice1;
  // var minprice2 = service.current_productlist[service.current_productidx].minprice2;
  // var minprice = 15000;

  // var upperbound = (donationmethod == "1") ? minprice1 : minprice2;

  // 직접입력 금액이 선택된 경우
  if (direct_amount.hasClass("onf")) {

    var minprice = 15000;

    if (direct_amount.val() == "") {
      alert("후원할 금액을 입력해주세요");
      direct_amount.focus();
      return false;

    } else if (Number(direct_amount.val()) < minprice) {
      alert("최소 금액은 " + (minprice) + " 원 입니다.");
      direct_amount.focus();
      return false;
    }
  };

    // 직접입력 금액이 입력되지 않은 경우
  // } else {
  //   var price_row = $(".price_row");

  //   if (price_row.children.length == 1) {
  //     // 직접입력 금액 필수입력 검증 (직접입력 하나만 있는 경우)
  //     alert("금액을 선택해주세요");
  //     return false;
  //   }
  // };



  // 이름
  if (mem_nm.val() == "") {
    alert("이름을 입력해주세요.");
    mem_nm.focus();
    return false;
  };

  // 필수입력
  if (phone2.val() == "" && phone3.val() == "" && email_id.val() == "" && email_dns.value == "") {
    alert("휴대전화번호 또는 이메일을 입력해주세요.");
    $('html, body').animate({
      scrollTop: phone2.offset().top - 100
    }, 500);
    return false;
  }

  // 휴대전화번호
  if (phone2.val() != "" || phone3.val() != "") {

    if (phone2.val() == "") {
      alert("휴대전화번호를 입력해주세요.");
      phone2.focus();
      return false;
    }
    if (phone3.val() == "") {
      alert("휴대전화번호를 입력해주세요.");
      phone3.focus();
      return false;
    }
    if (!phone2.val().match(/\b[0-9]{3,4}\b/)) {
      alert("휴대전화번호 입력이 잘못되었습니다.");
      phone2.focus();
      return false;
    }
    if (!phone3.val().match(/\b[0-9]{4}\b/)) {
      alert("휴대전화번호 입력이 잘못되었습니다.");
      phone3.focus();
      return false;
    }
  }


  // 이메일
  // if (email_id.val() != "") {
  //   if (!validateEmail(email_id.val())) {
  //     alert("이메일 입력이 잘못되었습니다.");
  //     email.focus();
  //     return false;
  //   }
  // };

  if (!email_id.val() || !email_dns.val()) {
    alert("이메일을 입력해주세요.");
    email_id.focus();
    return false;
  };


  // auto_pay 자동이체 선택 시,
  if (pay_method1 == "R001") {
    if (bankcode.val() == "") {
      alert("은행명을 선택해주세요.");
      bankcode.focus();
      return false;
    }
    if (bank_account.val() == "") {
      alert("계좌번호를 입력해주세요.");
      bank_account.focus();
      return false;

    } else if (!number_check.test(bank_account.val())) {
      alert("계좌번호 입력이 잘못되었습니다.");
      bank_account.focus();
      return false;

    } else if (bank_account.val().length > 16) {
      alert("계좌번호는 16자리 이내로 입력해주세요.");
      bank_account.focus();
      return false;
    }

    bank_owner.val(bank_owner.val().trim());

    if (bank_owner.val() == "" || bank_owner.val().replace(/[^a-zA-Z가-힣]/g, "") == "") {
      alert("예금주명을 입력해주세요.");
      bank_owner.val(bank_owner.val().replace(/[^a-zA-Z가-힣]/g, ""));
      bank_owner.focus();
      return false;

    } else if (!korean_english_parenthesis_check.test(bank_owner.val())) {
      alert("예금주명에는 한글, 영문, 괄호만 입력이 가능합니다. 예금주명을 변경해 주세요.");
      bank_owner.focus();
      return false;
    }
    // else if (regularbankowner.val().search(/\s/) != -1 ) {
    // 	alert("예금주명을 공란 없이 입력해주세요.");
    //  bank_owner.focus();
    // 	return false;
    // }
    if (bank_owner_birth.val() == "") {
      alert("예금주 생년월일을 입력해주세요.");
      bank_owner_birth.focus();
      return false;

    } else if (!/([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/.test(bank_owner_birth.val())) {
      alert("예금주 생년월일을 주민등록번호 앞 6자리로 입력해주세요.");
      bank_owner_birth.focus();
      return false;
    }
    // 출금일
    if (withdrawday.val() == "") {
      alert("출금일을 선택해주세요.");
      withdrawday.focus();
      return false;
    }
  }


  // card_pay 신용카드 선택 시,
  else if (pay_method1 == "R002") {
    //카드번호
    if (card_no.val() == "") {
      alert("카드번호를 입력해주세요.");
      card_no.focus();
      return false;
    } else if (number_check.test(card_no.val()) == "") {
      alert("카드번호 입력이 잘못되었습니다.");
      card_no.focus();
      return false;
    } else if (card_no.val().replace(/-/g, '').length > 16 || card_no.val().replace(/-/g, '').length < 14) {
      alert("카드번호 자리수가 잘못되었습니다.");
      card_no.focus();
      return false;
    };

    if (!card_expire_mm.val()) {
      alert("유효기간(월)을 입력해주세요.");
      card_expire_mm.focus();
      return false;
    }
    if (!card_expire_yy.val()) {
      alert("유효기간(연)을 입력해주세요.");
      card_expire_yy.focus();
      return false;
    }
    if (card_expire_mm.val().length != 2 || Number(card_expire_mm.val()) > 12 || Number(card_expire_mm.val()) < 1) {
      alert("유효기간(월)을 확인해주세요.");
      card_expire_mm.focus();
      return false;
    }
    if (card_expire_yy.val().length != 2) {
      alert("유효기간(연)을 확인해주세요.");
      card_expire_yy.focus();
      return false;
    }
    if (Number(new Date().getFullYear().toString().substring(2)) > Number(card_expire_yy.val())) {
      alert("유효기간(연)은 금년 이후이어야 합니다.");
      card_expire_yy.focus();
      return false;
    }

    if (card_owner.val() == "") {
      alert("카드주 명을 입력해주세요.");
      card_owner.focus();
      return false;
    } else if (korean_english_check.test(card_owner.val())) {
      alert("카드주 명을 한글 또는 영문으로 입력해주세요.");
      card_owner.focus();
      return false;
    }
    if (!card_owner_birth.is(':hidden')) {
      if (card_owner_birth.val() == "") {
        alert("카드주 생년월일을 입력해주세요.");
        card_owner_birth.focus();
        return false;
      } else if (card_owner_birth.val().length != 6 && card_owner_birth.val().length != 10) {
        alert("카드주 생년월일을 확인해주세요.");
        card_owner_birth.focus();
        return false;

      } else if (!/([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/.test(card_owner_birth.val())) {
        alert("카드주 생년월일을 주민등록번호 앞 6자리로 입력해주세요.");
        card_owner_birth.focus();
        return false;
      }
    }
    if (!card_pwd.is(':hidden')) {
      if (card_pwd.val() == "") {
        alert("카드 비밀번호를 입력해주세요");
        card_pwd.focus();
        return false;
      }
    }
  };


  // 이용약관 동의
  if (!agree1.is(":checked")) {
    alert("후원회원약관에 동의해주세요.");
    agree1.focus();
    return false;
  }

  // 개인정보처리방침 동의
  if (!agree2.is(":checked")) {
    alert("개인정보처리방침에 동의해주세요.");
    agree2.focus();
    return false;
  }

  frm.submit();

}; // formCheck()
