import Input from "../../../../components/Input";


const arr = [1, 2, 3];
function Comment() {
  return (
    <>
      <div className="list-comment">
        {arr.map((cmt, index) => {
          return (
            <div key={index} className="comment-item">
              <img
                className="avatar-comment"
                src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                alt="img"
              />

              <div className="text-commnet">
                <b className="name">Võ Thập Nghĩa</b>
                <span className="time">20-02-2001</span>
                <span className="description-comment">Tuyệt vời ông mặt trời, Áo to đẹp giao hàng nhanh chất vải dày dặn from rộng đúng kiểu mình thích thích thích thích</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="your-comment">
        <div>Your Comment</div>
        <Input name="your-comment" type="textarea" />
      </div>
    </>
  );
}

export default Comment;
