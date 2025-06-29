// Light Gallery CDN:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/lightgallery.min.js"></script>
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery.min.css"/>
export default function lightgallery() {
	lightGallery(document.querySelector('._gallery'), {
	  download: false, // <= download icon true/false
	  controls: true, // <= arrows icons true/false
	});
}