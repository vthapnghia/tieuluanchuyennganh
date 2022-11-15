function Button(params) {
  return (
    <div className="login-form">
      {/* login */}
      <div className="login">
        <h1>Login</h1>
        <div className="group">
          <input className='input-text'></input>
          <label>Username</label>
        </div>
        <div className="group">
          <input className='input-text'></input>
          <label>Password</label>
        </div>
        <button>login</button>
      </div>
    </div>
  );
}
