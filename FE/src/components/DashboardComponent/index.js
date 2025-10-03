import './DashboardComponent.scss'
import useGetAllGrade from "../../func/getAllGrade"
import GpaLineChart from '../GpaLineChart';

function DashboardComponent() {
    const { grades, loading } = useGetAllGrade()
    const GradesMap = new Map([
        ["Xuất sắc", [3.6, 4.0]],
        ["Giỏi", [3.2, 3.5999]],
        ["Khá", [2.5, 3.1999]],
        ["Trung bình", [2.0, 2.4999]],
        ["Yếu", [0, 1.9999]],
    ]);

    function getXepLoai(diem) {
        for (const [xepLoai, [min, max]] of GradesMap) {
            if (diem >= min && diem <= max) {
                return xepLoai;
            }
        }
        return "Không hợp lệ";
    }
    return (
        <>
            <div className="dashboard-component">
                <div className="dashboard-component__card">
                    <div className="content-card">
                        <p>GPA</p>
                        <div>{!loading && grades.overallGPA}</div>
                    </div>
                    <div className='content-img'>
                        <img src="/images/Tin_chi.png" />
                    </div>
                </div>

                <div className="dashboard-component__card">
                    <div className="content-card">
                        <p>TCTL</p>
                        <div>{!loading && grades.totalCredit}</div>
                    </div>
                    <div className='content-img'>
                        <img src="/images/gpa.svg" />
                    </div>
                </div>

                <div className="dashboard-component__card">
                    <div className="content-card">
                        <p>Số môn hoàn thành</p>
                        <div>{!loading && grades.totalSubject}</div>
                    </div>
                    <div className='content-img'>
                        <img src="/images/So_mon_hoan_thanh.svg" />
                    </div>
                </div>

                <div className="dashboard-component__card">
                    <div className="content-card">
                        <p>Xếp loại</p>
                        <div>{!loading && getXepLoai(grades.overallGPA)}</div>
                    </div>
                    <div className='content-img'>
                        <img src="/images/TCTL.svg" />
                    </div>
                </div>
            </div>

            <GpaLineChart />
        </>
    )
}

export default DashboardComponent