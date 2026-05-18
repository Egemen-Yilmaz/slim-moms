const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'İsim alanı zorunludur.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'E-posta alanı zorunludur.'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Şifre alanı zorunludur.'],
      minlength: [6, 'Şifre en az 6 karakter olmalıdır.'],
    },
  },
  { timestamps: true, versionKey: false }
);

// Şifreyi veritabanına kaydetmeden hemen önce otomatik olarak hash'le (şifrele)
userSchema.pre('save', async function () {
  // Eğer şifre alanı değiştirilmediyse (örn: kullanıcı sadece ismini güncellediyse) işlemi geç
  if (!this.isModified('password')) return;
  
  // Şifreyi güvenli bir şekilde hash'le
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Giriş yapılırken gelen şifre ile DB'deki hash'lenmiş şifreyi karşılaştıran yardımcı metod
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);