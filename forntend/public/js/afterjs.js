 async function updateAccountInfo(eventId) {
            try {
                  const response = await fetch("/getUserinfo", {
                        method: 'GET',
                        headers: {
                              'Content-Type': 'application/json'
                        }
                  });

                  // Check if the response is JSON
                  const contentType = response.headers.get("content-type");
                  if (contentType && contentType.includes("application/json")) {
                        const result = await response.json();

                        if (response.status === 200) {
                              const nameElement = document.querySelector('.currName .name');
                              const imgElement = document.querySelector('.currName img');
                              nameElement.textContent = result.name;
                              imgElement.src = result.img;
                        } 
                              const dropdownItem = document.querySelector('.nav-item.dropdown');
                              dropdownItem?.remove();
                             
                  } else {
                        console.error("Received non-JSON response");
                        // Handle non-JSON response (like an HTML page)
                  }
            } catch (error) {
                  console.error("An error occurred:", error);  // Log any caught errors
            }
      }

      // Example call with an eventId
      const eventId = "your_event_id_here";  // Replace this with a valid eventId
      updateAccountInfo(eventId);
