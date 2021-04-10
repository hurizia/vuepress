const GetGoogleFonts = require('get-google-fonts');

let ggf = new GetGoogleFonts();


// WOFF2 (Chrome) : Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
// WOFF (Chrome) : Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7
// EOT (IE8) : Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; IPMS/A640400A-14D460801A1-000000426571; TCO_20110131100426; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; Tablet PC 2.0)
// TTF (Safari) : Mozilla/5.0 (Windows; U; Windows NT 6.1; ko-KR) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5


ggf.download('https://fonts.googleapis.com/css?family=Roboto:400,700&subset=cyrillic&display:swap', {
	userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_5 like Mac OS X; en_US) AppleWebKit (KHTML, like Gecko) Mobile [FBAN/FBForIPhone;FBAV/4.1;FBBV/4100.0;FBDV/iPhone2,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/4.3.5;FBSS/1; FBCR/T-MobileHR;FBID/phone;FBLC/en_US;FBSF/1.0]'
}).then(() => {
	console.log('Done!')
}).catch(() => {
	console.log('Whoops!')
});