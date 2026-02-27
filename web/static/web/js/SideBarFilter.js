$(document).ready(function () {
  function toggleDropdown($dropdown) {
    const $content = $dropdown.find(".dropdown-content");

    if ($dropdown.hasClass("active")) {
      $content.css("max-height", $content.prop("scrollHeight") + "px");
      $content[0].offsetHeight;
      $content.css("max-height", "0px");

      setTimeout(() => {
        $dropdown.removeClass("active");
      }, 300);
    } else {
      $dropdown.addClass("active");
      $content.css("max-height", $content.prop("scrollHeight") + "px");
    }
  }

  $(".dropdown-header").click(function (e) {
    e.stopPropagation();
    const $dropdown = $(this).parent(".dropdown");
    toggleDropdown($dropdown);
  });

  $(document).click(function () {
    $(".dropdown").each(function () {
      const $dropdown = $(this);
      if ($dropdown.hasClass("active")) {
        toggleDropdown($dropdown);
      }
    });
  });

  $(".dropdown-content").click(function (e) {
    e.stopPropagation();
  });

  $("#apply-btn").click(function () {
    let selectedCollections = [];
    const minValue = $("#min-price").val();
    const maxValue = $("#max-price").val();

    $(".collection-list .checkbox-label input")
      .filter((index, element) => element.checked)
      .each((index, element) => {
        selectedCollections.push(element.value);
      });

    const urlParams = new URLSearchParams(window.location.search);

    if (minValue) {
      urlParams.set("min_price", minValue);
    } else urlParams.delete("min_price");
    if (maxValue) {
      urlParams.set("max_price", maxValue);
    } else urlParams.delete("max_price");
    if (selectedCollections.length > 0) {
      urlParams.set("collection", selectedCollections.join(","));
    } else urlParams.delete("collection");

    urlParams.delete("page");

    const queryString = urlParams.toString();
    window.location.href =
      window.location.pathname + (queryString ? "?" + queryString : "");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const minPrice = urlParams.get("min_price");
  const maxPrice = urlParams.get("max_price");
  const collection = urlParams.get("collection");

  if (minPrice) {
    document.getElementById("min-price").value = minPrice;
  }
  if (maxPrice) {
    document.getElementById("max-price").value = maxPrice;
  }
  if (collection) {
    const collectionArray = collection.split(",");
    $(".collection-list .checkbox-label input").each((index, element) => {
      if (collectionArray.includes(element.value)) {
        element.checked = true;
      }
    });
    //
    // collectionArray.forEach(collectionItem => {
    // const checkbox = document.getElementById(collectionItem);
    // if (checkbox) {
    // checkbox.checked = true;
    // }
    // });
  }
});
