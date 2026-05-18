const jwt = require('jsonwebtoken');
const { HTTP_STATUS } = require('../utils/constants');

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. İstek başlıklarında (Headers) Authorization kısmını ve Bearer kelimesini kontrol et
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // "Bearer eyJhbGci..." metnini boşluktan bölüp sadece token kısmını alıyoruz
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Eğer token hiç gönderilmediyse geçişe izin verme
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: 'fail',
        message: 'Bu işlemi gerçekleştirmek için lütfen giriş yapın.',
      });
    }

    // 3. Token'ı bizim gizli anahtarımızla (ACCESS_TOKEN_SECRET) doğrula
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: 'fail',
          message: 'Geçersiz veya süresi dolmuş token. Lütfen tekrar giriş yapın.',
        });
      }

      // 4. Token geçerliyse, içindeki kullanıcı ID'sini req.user içine atıyoruz
      // Böylece sonraki fonksiyonlarda "Bu isteği hangi kullanıcı attı?" sorusunun cevabı req.user.id olacak.
      req.user = { id: decoded.id };
      next(); // Muhafız onay verdi, bir sonraki adıma (Controller'a) geçebilirsin!
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { protect };