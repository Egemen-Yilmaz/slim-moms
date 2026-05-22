const User = require('../models/User');
const Session = require('../models/Session');
const { registerSchema, loginSchema } = require('../validation/auth');
const { generateTokens } = require('../services/auth');
const jwt = require('jsonwebtoken');

// KULLANICI KAYIT (REGISTER)
const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 'fail', message: error.details[0].message });
    }

    const userExists = await User.findOne({ email: value.email });
    if (userExists) {
      return res.status(409).json({ status: 'fail', message: 'Bu e-posta adresi zaten kullanımda.' });
    }

    const newUser = await User.create(value);
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
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 'fail', message: error.details[0].message });
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Hatalı e-posta veya şifre.' });
    }

    const isPasswordCorrect = await user.comparePassword(value.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: 'fail', message: 'Hatalı e-posta veya şifre.' });
    }

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

// TOKEN YENİLEME (REFRESH) - 🛠️ ASENKRON VE GEÇERSİZ CALLBACK YAPISI DÜZELTİLDİ
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ status: 'fail', message: 'Refresh token bulunamadı.' });
    }

    const activeSession = await Session.findOne({ refreshToken });
    if (!activeSession) {
      return res.status(403).json({ status: 'fail', message: 'Geçersiz veya süresi dolmuş oturum.' });
    }

    try {
      // jwt.verify senkron çalıştırılarak try-catch kapsamına alındı
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      
      // Eski oturumu sil ve yenisini üret
      await Session.deleteOne({ refreshToken });
      const tokens = await generateTokens(decoded.id);

      return res.status(200).json({
        status: 'success',
        data: { ...tokens }
      });
    } catch (jwtErr) {
      // Eğer token süresi dolmuşsa veya bozuksa DB'deki session'ı temizle
      await Session.deleteOne({ refreshToken });
      return res.status(403).json({ status: 'fail', message: 'Oturum süreniz dolmuş, lütfen tekrar giriş yapın.' });
    }
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

    await Session.deleteOne({ refreshToken });
    return res.status(204).json(); 
  } catch (err) {
    next(err);
  }
};

// O ANKİ AKTİF KULLANICI BİLGİLERİ (CURRENT USER) - 🛠️ MÜKERRER DEĞİŞKEN TANIMI KALDIRILDI
const getCurrentUser = async (req, res, next) => {
  try {
    // Üstte zaten require edildiği için buradaki mükerrer let/const tanımı hataya sebep oluyordu, temizlendi.
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'Kullanıcı bulunamadı.' });
    }

    return res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getCurrentUser
};