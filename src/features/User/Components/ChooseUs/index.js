import { whyChooseUs } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import "./ChooseUs.scss";

function ChooseUs() {
  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <h2 className="section-title">Tại sao chọn chúng tôi</h2>
            <p>
            Bên cạnh việc phải thông thạo những kiến thức lập trình về ngôn ngữ, framework, thư viện thì lập trình viên Front-end cũng cần có...
            </p>

            <div className="row my-5">
              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Truck className="imf-fluid" />
                  </div>
                  <h3>Nhanh &amp; miễn phí vận chuyển</h3>
                  <p>
                  Bên cạnh việc phải thông thạo những kiến thức lập trình về ngôn ngữ, framework, thư viện thì lập trình viên Front-end cũng cần có...
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Bag />
                  </div>
                  <h3>Dễ dàng mua sắm</h3>
                  <p>
                  Bên cạnh việc phải thông thạo những kiến thức lập trình về ngôn ngữ, framework, thư viện thì lập trình viên Front-end cũng cần có...
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Support />
                  </div>
                  <h3>Hổ trợ 24/7 </h3>
                  <p>
                  Bên cạnh việc phải thông thạo những kiến thức lập trình về ngôn ngữ, framework, thư viện thì lập trình viên Front-end cũng cần có...
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <Icons.Return />
                  </div>
                  <h3>Chính sách hoàn tiền</h3>
                  <p>
                  Bên cạnh việc phải thông thạo những kiến thức lập trình về ngôn ngữ, framework, thư viện thì lập trình viên Front-end cũng cần có...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="img-wrap">
              <img src={whyChooseUs} alt="wrap" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
