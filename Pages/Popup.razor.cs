using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace BrowserExtension.Pages
{
	public partial class Popup
	{
		private async Task CollectAllImages()
		{
			await JSRuntime.InvokeVoidAsync("collectImages");
		}
	}
}
