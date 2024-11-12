<script lang="ts">
	import { type QuillOptions } from 'quill'
	import type Quill from 'quill'
	import 'quill/dist/quill.snow.css'
	import { Button, buttonVariants } from './ui/button'
	import PiTextAa from './icons/pi-text-aa.svelte'
	import { ImageIcon, Smile } from 'lucide-svelte'
	import MdSend from './icons/md-send.svelte'
	import Hint from './hint.svelte'
	import { cn } from '../utils'
	import type { Delta, Op } from 'quill/core'

	interface Props {
		variant?: 'create' | 'update'
		onSubmit: ({ image, body }: { image: File | null; body: string }) => void
		onCancel?: () => void
		placeholder?: string
		defaultValue?: Delta | Op[]
		disabled?: boolean
		innerRef: Quill | null
		setInnerRef: (ref: Quill | null) => void
	}

	let {
		variant = 'create',
		onSubmit,
		onCancel,
		placeholder = 'Write something...',
		defaultValue = [],
		innerRef,
		disabled = false,
		setInnerRef,
	}: Props = $props()

	let container: HTMLDivElement

	let isToolbarVisible = $state(true)

	const toggleToolbar = () => {
		isToolbarVisible = !isToolbarVisible
		const toolbarElement = container.querySelector('.ql-toolbar')

		if (!toolbarElement) return

		toolbarElement.classList.toggle('hidden', !isToolbarVisible)
	}

	let text = $state('')
	const isEmpty = $derived(text.replace(/<(.|\n)*?>/g, '').trim().length === 0)

	$effect(() => {
		let quill: Quill
		const runQuill = async () => {
			const editorContainer = container.appendChild(container.ownerDocument.createElement('div'))

			const options: QuillOptions = {
				theme: 'snow',
				placeholder,
				modules: {
					toolbar: [
						['bold', 'italic', 'strike'],
						['link'],
						[{ list: 'ordered' }, { list: 'bullet' }],
					],
					keyboard: {
						bindings: {
							enter: {
								key: 'Enter',
								handler: () => {
									return
								},
							},
							shift_enter: {
								key: 'Enter',
								shiftKey: true,
								handler: () => {
									quill.insertText(quill.getSelection()?.index || 0, '\n')
								},
							},
						},
					},
				},
			}

			const { default: Quill } = await import('quill')

			quill = new Quill(editorContainer, options)
			quill.focus()

			setInnerRef(quill)

			text = quill.getText()

			quill.on(Quill.events.TEXT_CHANGE, () => {
				text = quill.getText()
			})
		}

		runQuill()

		return () => {
			quill.off('text-change')
			container.innerHTML = ''
		}
	})
</script>

<div class="flex flex-col">
	<div
		class="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm"
	>
		<div bind:this={container} class="ql-custom h-full"></div>

		<div class="z-[5] flex px-2 pb-2">
			<Hint label={isToolbarVisible ? 'Hide formatting' : 'Show formatting'}>
				<span
					class={cn(buttonVariants({ size: 'iconSm', variant: 'ghost' }))}
					onclick={() => !disabled && toggleToolbar()}
					role="button"
					tabindex="0"
					onkeydown={() => !disabled && toggleToolbar()}
				>
					<PiTextAa class="size-4" />
				</span>
			</Hint>

			<Hint label="Emoji">
				<span
					class={cn(buttonVariants({ size: 'iconSm', variant: 'ghost' }))}
					onclick={() => !disabled}
					role="button"
					tabindex="0"
					onkeydown={() => !disabled}
				>
					<Smile class="size-4" />
				</span>
			</Hint>

			{#if variant === 'update'}
				<div class="ml-auto flex items-center gap-x-2">
					<Button variant="outline" size="sm" onclick={() => {}} {disabled}>Cancel</Button>
					<Button
						disabled={disabled || isEmpty}
						onclick={() => {}}
						size="sm"
						class="bg-[#007a5a] text-white hover:bg-[#007a5a]/80"
					>
						Save
					</Button>
				</div>
			{/if}

			{#if variant === 'create'}
				<Hint label="Image">
					<span class={cn(buttonVariants({ size: 'iconSm', variant: 'ghost' }))}>
						<ImageIcon class="size-4" />
					</span>
				</Hint>
				<Button
					size="iconSm"
					class={cn(
						'ml-auto',
						isEmpty
							? 'bg-white text-muted-foreground hover:bg-white'
							: 'bg-[#007a5a] text-white hover:bg-[#007a5a]/80',
					)}
					disabled={disabled || isEmpty}
				>
					<MdSend class="size-4" />
				</Button>
			{/if}
		</div>
	</div>

	<div class="flex justify-end p-2 text-[10px] text-muted-foreground">
		<p>
			<strong>Shift + Return</strong>
			to add a new line
		</p>
	</div>
</div>
