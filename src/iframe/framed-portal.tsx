export function FramedPortal(props: PropsWithChildren) {
  const subdocBodyRef = useRef<HTMLElement>(null);
  const [subdocBody, setSubdocBody] = useState<HTMLElement>(null);

  useEffect(() => {
  }, [])

  const portal = subdocBody && <Portal></Portal>

  return <iframe><Portal>
}
