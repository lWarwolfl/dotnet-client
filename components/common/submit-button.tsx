import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export type SubmitButtonProps = React.ComponentProps<typeof Button> & { loading?: boolean }

export function SubmitButton({ loading, children, ...props }: SubmitButtonProps) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? (
        <>
          <span className="opacity-0">{children}</span>
          <span className="absolute flex w-full items-center justify-center">
            <Spinner />
          </span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
