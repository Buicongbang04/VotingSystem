export default function Background({ src }: { src: string }) {
    return (
        <div
            className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${src})` }}
        />
    )
}
