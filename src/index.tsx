export const layout = "base.tsx"

export default ( data: Lume.Data ) => {
    return <div class="
        flex flex-col gap-4 justify-center items-center
        w-full h-[60svh]
    ">
        <span class="font-mono">
            under heavy construction
        </span>
        <span class="font-mono">
            check out <a href={ data.git_repo }>source code</a>
        </span>
    </div>
}