$(document).ready(function () {
  let emotionBar = $('#emotion-bar');
  let pointer = $('<div id="pointer"></div>');
  let emojis = $('.emoji');
  let originalPostText = '';

  // Function to update emoji position based on the pointer's position
  function updateEmojiPosition() {
    let pointerPosition = pointer.position().left;
    let emotionBarWidth = emotionBar.width();

    emojis.each(function (index) {
      let emoji = $(this);
      let emojiPosition = (index / (emojis.length - 1)) * 100;

      // Assume the default emoji is the happiest
      let isDefaultEmoji = emoji.hasClass('😄');

      if (isDefaultEmoji || emojiPosition <= (pointerPosition / emotionBarWidth) * 100) {
        emoji.show();
      } else {
        emoji.hide();
      }
    });
  }

  // Function to check emotion level and show/hide offensive content popup
  function checkEmotionLevel() {
    let emotionLevel = (pointer.position().left / emotionBar.width()) * 100;

    // Add your logic to check emotion level and show/hide offensive content popup
    // For now, let's assume the threshold is 40%
    if (emotionLevel > 40) {
      $('.popup-container').fadeIn();
    } else {
      $('.popup-container').fadeOut();
    }
  }

  // Append the pointer to the emotion bar
  emotionBar.append(pointer);

  // Handle post button click
  $('#post-form').submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Show the emotion bar
    emotionBar.show();

    // Make the pointer non-draggable
    pointer.css('pointer-events', 'none');

    // Check emotion level when posting
    updateEmojiPosition();
    checkEmotionLevel();

    // Save the original post text
    originalPostText = $('#post-text').val();

    // Make a POST request to the server
    $.ajax({
      url: 'http://localhost:5000/saveData',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ originalPostText: [originalPostText] }),  // Wrap the text in an array
      success: function (response) {
        console.log(response);
    
        // Process the machine learning prediction response
        const prediction = response.prediction;
        console.log('Machine Learning Prediction:', prediction);
    
        // Check if the prediction is 'Offensive' (make sure it's a case-sensitive match)
        const offensiveThreshold = 0.5;
        console.log(prediction.probability);
        if (prediction.probability > offensiveThreshold) {
          console.log('Prediction is Offensive. Moving pointer to the right.');
    
          // Assuming you have set the maximum value of the emotion bar to 100
          const maxEmotionValue = 100;
    
          // Set the pointer position to the maximum value using CSS
          pointer.css('left', maxEmotionValue + '%');
    
          // Show the crying emoji
          $('#pointer').html('😭').show();
        } else {
          console.log('Prediction is not Offensive. Moving pointer to the left.');
    
          // Set the pointer position to the minimum value using CSS
          pointer.css('left', '0%');
    
          // Show the happy emoji
          $('#pointer').html('😄').show();
        }
    
        // Add logic to handle the prediction as needed
      },
      error: function (error) {
        console.error('Error saving data:', error);
      },
    })

  });
});
