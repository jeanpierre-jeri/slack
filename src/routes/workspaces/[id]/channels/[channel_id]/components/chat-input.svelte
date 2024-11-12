<script lang="ts">
	import Editor from '@/lib/components/editor.svelte'
	import type Quill from 'quill'

	interface Props {
		placeholder: string
	}

	const { placeholder }: Props = $props()

	let editorRef = $state<Quill | null>(null)

	function setEditorRef(ref: Quill | null) {
		editorRef = ref
	}
</script>

<div class="w-full px-5">
	<Editor
		{placeholder}
		onSubmit={() => {}}
		disabled={false}
		innerRef={editorRef}
		setInnerRef={setEditorRef}
	/>
</div>
