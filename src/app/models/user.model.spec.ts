import { User } from './user.model';

fdescribe('User Model - getAge() Method', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  
  it('TC-01: Should calculate correct age for normal past date (1990-01-01)', () => {
    user.dateOfBirth = new Date('1990-01-01');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(33);
    expect(result).toBeLessThanOrEqual(34);
  });

  
  it('TC-02: Should calculate correct age for boundary case (1990-05-20)', () => {
    user.dateOfBirth = new Date('1990-05-20');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(33);
    expect(result).toBeLessThanOrEqual(34);
  });

  
  it('TC-03: Should calculate correct age for end of year date (1990-12-31)', () => {
    user.dateOfBirth = new Date('1990-12-31');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(33);
    expect(result).toBeLessThanOrEqual(35);
  });

  
  it('TC-04: Should return 0 for future date (2024-05-20)', () => {
    user.dateOfBirth = new Date('2024-05-20');
    const result = user.getAge();
    expect(result).toBe(0);
  });

  
  it('TC-05: Should calculate correct age for leap year date (2000-02-29)', () => {
    user.dateOfBirth = new Date('2000-02-29');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(23);
    expect(result).toBeLessThanOrEqual(26);
  });

  
  it('TC-06: Should handle invalid future date gracefully', () => {
    user.dateOfBirth = new Date('2025-01-01');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(0);
  });

  
  it('TC-07: Should throw error for invalid date format', () => {
    user.dateOfBirth = new Date('invalid-date');
    expect(() => user.getAge()).toThrowError();
  });

  
  it('TC-08: Should throw error for null/missing dateOfBirth', () => {
    user.dateOfBirth = null as any;
    expect(() => user.getAge()).toThrowError('Missing Data: dateOfBirth is required');
  });

  
  it('TC-09: Should calculate correct age for very old date (1900-01-01)', () => {
    user.dateOfBirth = new Date('1900-01-01');
    const result = user.getAge();
    expect(result).toBeGreaterThanOrEqual(123);
    expect(result).toBeLessThanOrEqual(125);
  });

  
  it('TC-10: Should calculate correct age when today is birthday', () => {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
    user.dateOfBirth = birthDate;
    const result = user.getAge();
    expect(result).toBe(30);
  });

  
  it('Should create user with sample data from class diagram', () => {
    user = new User(
      'daranporn@gmail.com',
      'yjdf1716',
      'ศรีพร',
      'อุตมพรหม',
      '0891234567',
      '2012-05-26'
    );

    expect(user.userEmail).toBe('daranporn@gmail.com');
    expect(user.userPassword).toBe('yjdf1716');
    expect(user.userFirstName).toBe('ศรีพร');
    expect(user.userLastName).toBe('อุตมพรหม');
    expect(user.userTel).toBe('0891234567');
    expect(user.getFullName()).toBe('ศรีพร อุตมพรหม');
    expect(user.getAge()).toBeGreaterThanOrEqual(11);
    expect(user.getAge()).toBeLessThanOrEqual(12);
  });

  
  it('Should create second user with sample data', () => {
    user = new User(
      'boompoj@gmail.com',
      'mmyf9876',
      'บูมเพชร',
      'จี้จุฒิมายา',
      '0641825563',
      '2011-10-17'
    );

    expect(user.userEmail).toBe('boompoj@gmail.com');
    expect(user.userPassword).toBe('mmyf9876');
    expect(user.getFullName()).toBe('บูมเพชร จี้จุฒิมายา');
    expect(user.getAge()).toBeGreaterThanOrEqual(12);
  });

  
  it('Should create third user with sample data', () => {
    user = new User(
      'bodin_thai@gmail.com',
      'mmy64577',
      'บดินทร์',
      'วัจรจณฐ',
      '0986345661',
      '2007-04-29'
    );

    expect(user.userEmail).toBe('bodin_thai@gmail.com');
    expect(user.userPassword).toBe('mmy64577');
    expect(user.getFullName()).toBe('บดินทร์ วัจรจณฐ');
    expect(user.getAge()).toBeGreaterThanOrEqual(16);
    expect(user.getAge()).toBeLessThanOrEqual(17);
  });

  
  it('Should format date of birth correctly', () => {
    user.dateOfBirth = new Date('2012-05-26');
    const formatted = user.getFormattedDateOfBirth();
    expect(formatted).toContain('May');
    expect(formatted).toContain('26');
    expect(formatted).toContain('2012');
  });
});