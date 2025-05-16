export default function Header(){
    return (
        <>
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="d-flex align-items-center">
                <a className="navbar-brand" href="/">Voucher Manager</a>
                <div className="navbar-nav ms-auto flex-row">
                    <a className="nav-link text-white px-2" href="/vouchers">List</a>
                    <a className="nav-link text-white px-2" href="/redeem">Redeem</a>
                </div>
                    </div>
                </nav>
            </header>
        </>
    )
}