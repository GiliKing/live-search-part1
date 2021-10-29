<?php
    
  // check if the page has been rquired before if yes then do not require it again
  require "../database/connect.php";

  // checks if the ajax method is set as POST
  if (isset($_POST['query'])) {
      $valueType = $_POST['query'];
      //using the sql like operator and the percentage sign % to find any value that starts with the inputed value
      $query = "SELECT * FROM `engine` WHERE `title` LIKE '%{$valueType}%'  LIMIT 100";
      $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
          $i = 0;
        while ($res = mysqli_fetch_array($result)) {
          echo '
              <button id="my_but'.$i.'" style="
                border: none;
                background-color: transparent;
              ">'.$res['title'].'</button>

              <input type="text" id="d_n'.$i.'" value="'.$res['title'].'" style="
                border: none;
                color: transparent;
                background-color: transparent;
                cursor: pointer;
                outline: none;
                display: none;
              ">
              <script>
                $(document).ready(function() {
                  $("#my_but'.$i.'").click(function() {
                    let query = document.getElementById("d_n'.$i.'").value;

                    $.ajax({
                      url: "look/look.php", // containers our query logic
                      method: "POST",
                      data : {
                          query: query
                      },
                      success: function(data) {
                        //display the live search 
                        $("#click_result").html(data);
                        $("#click_result").css("display", "block");

                        $("#search_result").css("display", "none");

                        $("#re_search").css("display", "none");

                        document.getElementById("live_search").value = "";

                        
                      }

                    });
  
                    });
                  });
              </script>
          '."<br>";

          $i++;
        // echo $res['title']. "<br/>";
      }
    }
  }
?>