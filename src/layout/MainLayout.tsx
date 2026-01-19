const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-110 min-h-screen mx-auto">{children}</div>
    )
}

export default MainLayout