defmodule BattleshipWeb.TableChannel do
  use BattleshipWeb, :channel
  alias Phoenix.Socket

  def join("table:" <> table_id, payload, socket) do
    if authorized?(payload) do
      Socket.assign(socket, :table_id, table_id)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("new:message", %{"message" => message}, socket) do
    broadcast_from socket, "new:message", %{"message" => message}
    {:noreply, socket}
  end

  def handle_in("new:board", %{"board" => board}, socket) do
    broadcast_from socket, "new:board", %{"board" => board}
    {:noreply, socket}
  end

  def handle_in("new:shot", %{"loc" => loc}, socket) do
    broadcast_from socket, "new:shot", %{"loc" => loc}
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
