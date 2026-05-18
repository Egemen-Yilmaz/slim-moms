const User = require('../models/User');
const Session = require('../models/Session');
const { registerSchema, loginSchema } = require('../validation/auth');
const { generateTokens } = require('../services/auth');

const jwt = require('jsonwebtoken');


// KULLANICI KAYIT (REGISTER)
const register = async (req, res, next) => {
  try {
    // Joi Doğrulaması
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 'fail', message: error.details[0].message });
    }

    // E-posta adresi sistemde zaten var mı?
    const userExists = await User.findOne({ email: value.email });
    if (userExists) {
      return res.status(409).json({ status: 'fail', message: 'Bu e-posta adresi zaten kullanımda.' });
    }

    // Yeni kullanıcıyı kaydet (Şifre model içinde otomatik hash'lenecek)
    const newUser = await User.create(value);

    // Kullanıcıya özel tokenları üret ve session'ı başlat
    const tokens = await generateTokens(newUser._id);

    return res.status(201).json({
      status: 'success',
      data: {
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
        ...tokens
      }
    });
  } catch (err) {
    next(err);
  }
};

// KULLANICI GİRİŞİ (LOGIN)
const login = async (req, res, next) => {
  try {
    // Joi Doğrulaması
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 'fail', message: error.details[0].message });
    }

    // Kullanıcıyı bul
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Hatalı e-posta veya şifre.' });
    }

    // Şifreyi doğrula (Model içindeki karşılaştırma metodunu çağırıyoruz)
    const isPasswordCorrect = await user.comparePassword(value.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: 'fail', message: 'Hatalı e-posta veya şifre.' });
    }

    // Giriş başarılı, yeni tokenları ve session'ı üret
    const tokens = await generateTokens(user._id);

    return res.status(200).json({
      status: 'success',
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        ...tokens
      }
    });
  } catch (err) {
    next(err);
  }
};



// TOKEN YENİLEME (REFRESH)
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ status: 'fail', message: 'Refresh token bulunamadı.' });
    }

    // 1. Veritabanında bu aktif oturum var mı kontrol et
    const activeSession = await Session.findOne({ refreshToken });
    if (!activeSession) {
      return res.status(403).json({ status: 'fail', message: 'Geçersiz veya süresi dolmuş oturum.' });
    }

    // 2. Token'ın doğruluğunu ve süresini kontrol et
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        // Token bozuksa veya süresi bittiyse DB'deki geçersiz session'ı temizle
        await Session.deleteOne({ refreshToken });
        return res.status(403).json({ status: 'fail', message: 'Oturum süreniz dolmuş, lütfen tekrar giriş yapın.' });
      }

      // 3. Her şey doğruysa ESKİ oturumu DB'den sil
      await Session.deleteOne({ refreshToken });

      // 4. YEPYENİ bir token çifti üret ve yeni session'ı DB'ye kaydet
      const tokens = await generateTokens(decoded.id);

      return res.status(200).json({
        status: 'success',
        data: { ...tokens }
      });
    });
  } catch (err) {
    next(err);
  }
};

// OTURUMU KAPATMA (LOGOUT)
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ status: 'fail', message: 'Refresh token zorunludur.' });
    }

    // Oturumu veritabanından tamamen sil
    await Session.deleteOne({ refreshToken });

    return res.status(204).json(); // 204 No Content: Başarıyla silindi, dönecek body yok demek
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};